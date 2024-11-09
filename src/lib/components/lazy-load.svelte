<script lang="ts">
  import { onMount, tick, type Snippet } from 'svelte';

  interface LazyLoadProps {
    children: Snippet;
    placeholder?: Snippet;
  }

  const { children, placeholder }: LazyLoadProps = $props();

  let isMounted = $state(false);

  let div: HTMLDivElement;

  function handleLoadOrError(this: HTMLImageElement) {
    isMounted = true;
    this.removeEventListener('load', handleLoadOrError);
    this.removeEventListener('error', handleLoadOrError);
  }

  onMount(async () => {
    const parentWithBlurURL = div.closest('[data-blur-url]');
    if (
      parentWithBlurURL instanceof HTMLElement &&
      parentWithBlurURL.dataset.blurUrl
    ) {
      const image = new Image();

      const blurURL = parentWithBlurURL.dataset.blurUrl;
      parentWithBlurURL.style.backgroundImage = `url(${blurURL})`;
      image.src = blurURL;

      await tick();
      image.addEventListener('load', handleLoadOrError);
      image.addEventListener('error', handleLoadOrError);
    } else {
      isMounted = true;
    }
  });
</script>

<div bind:this={div}>
  {#if isMounted}
    {@render children()}
  {:else}
    {@render placeholder?.()}
  {/if}
</div>

<style>
  div {
    max-width: 100%;
  }
</style>
