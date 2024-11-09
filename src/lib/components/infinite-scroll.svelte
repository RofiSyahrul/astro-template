<script lang="ts" module>
  interface InfiniteScrollProps {
    children: Snippet;
    isLoading?: boolean;
    onReachLowermost?: () => void;
    scrollTarget?: string;
  }

  function getScrollTarget(
    thisEl: HTMLDivElement,
    selector?: string,
  ): Window | HTMLElement {
    if (selector) {
      const target =
        thisEl.querySelector(selector) ??
        document.querySelector(selector);

      if (target instanceof HTMLElement) return target;
    }

    return window;
  }

  function isReachLowermostOnWindow() {
    const currentPosition =
      document.body.offsetHeight + window.scrollY;
    const scrollHeight = document.body.scrollHeight;
    return currentPosition >= scrollHeight;
  }

  function isReachLowermostOnElement(el: HTMLElement) {
    const currentPosition = el.offsetHeight + el.scrollTop;
    return currentPosition >= el.scrollHeight;
  }
</script>

<script lang="ts">
  import { onMount, type Snippet } from 'svelte';

  let {
    children,
    isLoading = $bindable(false),
    onReachLowermost,
    scrollTarget,
  }: InfiniteScrollProps = $props();

  let element: HTMLDivElement;

  export function getElement() {
    return element;
  }

  function handleScroll(this: Window | HTMLElement) {
    const isReachLowermost =
      this instanceof HTMLElement
        ? isReachLowermostOnElement(this)
        : isReachLowermostOnWindow();

    if (isReachLowermost && typeof onReachLowermost === 'function') {
      onReachLowermost();
    }
  }

  onMount(() => {
    const target = getScrollTarget(element, scrollTarget);

    target.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    return () => {
      target.removeEventListener('scroll', handleScroll);
    };
  });
</script>

<div bind:this={element}>
  {@render children()}

  {#if isLoading}
    <div class="loading" title="Loading...">
      <span class="spinner"></span>
      <span class="visually-hidden">Loading...</span>
    </div>
  {/if}
</div>

<style lang="scss">
  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 16px auto;
    width: 100%;
  }
</style>
