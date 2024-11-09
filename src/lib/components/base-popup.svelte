<script lang="ts" module>
  import type { Snippet } from 'svelte';
  import type { Action } from 'svelte/action';
  import type { MouseEventHandler } from 'svelte/elements';

  type AnimationType = 'enter' | 'leave';

  interface BasePopupProps {
    children: Snippet;
    isForceRender?: boolean;
    isOpen?: boolean;
    onOverlayClick?: MouseEventHandler<HTMLDivElement>;
  }

  interface PortalParams {
    isForceRender: boolean;
    target: HTMLElement | null;
  }

  const PORTAL_ID = '__PORTAL__';

  function getOrCreatePortalTarget(doc: Document) {
    let target = doc.querySelector<HTMLElement>('#' + PORTAL_ID);
    if (target) return target;

    target = doc.createElement('div');
    target.id = PORTAL_ID;
    doc.body.append(target);

    return target;
  }

  const portal: Action<HTMLDivElement, PortalParams> = (
    node,
    { isForceRender, target },
  ) => {
    if (isForceRender || !target) return;

    $effect(() => {
      target.append(node);
      return () => {
        node.remove();
      };
    });
  };

  const noop = () => {};
</script>

<script lang="ts">
  const {
    children,
    isForceRender = false,
    isOpen = false,
    onOverlayClick,
  }: BasePopupProps = $props();

  const animationType = $derived<AnimationType>(
    isOpen ? 'enter' : 'leave',
  );

  let isShown = $state(false);
  let portalTarget = $state<HTMLElement | null>(null);
  let prevOverflow = '';

  function handleOpen() {
    isShown = true;

    if (!portalTarget && !isForceRender) {
      portalTarget = getOrCreatePortalTarget(document);
    }

    prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }

  function handleAnimationEnd() {
    if (animationType === 'leave') {
      isShown = false;
      document.body.style.overflow = prevOverflow;
    }
  }

  $effect(() => {
    if (animationType === 'enter') {
      handleOpen();
    }
  });
</script>

{#if portalTarget || isForceRender}
  <div
    aria-hidden={!isShown}
    class="popup"
    data-animation-type={animationType}
    use:portal={{ isForceRender, target: portalTarget }}
    onanimationend={handleAnimationEnd}
  >
    <div
      class="overlay"
      role="none"
      tabindex="-1"
      onclick={onOverlayClick}
      onkeyup={noop}
    ></div>

    <dialog
      class="scrollbar-thin scrollbar-track-neutral-bright1 scrollbar-thumb-primary-dim"
      open={isShown}
    >
      {@render children()}
    </dialog>
  </div>
{/if}

<style lang="scss">
  dialog {
    position: relative;
    overflow: auto;
    border: none;
    border-radius: 8px;
    box-shadow: var(--shadow-high);
    color: var(--color-neutral-dim);
    background-color: var(--color-neutral-bright);
    max-height: var(--popup-max-height);
    max-width: var(--popup-max-width);
    padding: 16px;
    animation-duration: inherit;
    animation-fill-mode: inherit;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--color-neutral-dim0);
    opacity: 56%;
  }

  .popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    animation-duration: 0.2s;
    animation-fill-mode: both;
    animation-timing-function: ease-in;
    z-index: 1000;

    --popup-max-height: 90%;
    --popup-max-width: 95%;

    &[aria-hidden='true'] {
      display: none;
    }

    &[data-animation-type='enter'] {
      animation-name: fadeIn;

      dialog {
        animation-name: zoomIn;
      }
    }

    &[data-animation-type='leave'] {
      animation-name: fadeOut;

      .overlay {
        pointer-events: none;
      }

      dialog {
        animation-name: zoomOut;
      }
    }
  }
</style>
