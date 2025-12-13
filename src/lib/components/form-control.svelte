<script lang="ts">
  import clsx from 'clsx';
  import type { Snippet } from 'svelte';

  interface FormControlProps {
    children: Snippet;
    class?: string;
    el?: 'div' | 'label';
    helperText?: string;
    invalid?: boolean;
    label: string;
    required?: boolean;
  }

  const {
    children,
    class: className = '',
    el = 'label',
    helperText = '',
    invalid = false,
    label,
    required = false,
  }: FormControlProps = $props();

  const parsedHelperText = $derived(
    helperText.replaceAll('$label', label),
  );
</script>

<svelte:element
  this={el}
  class={clsx('form-control', className)}
  class:required
  data-form-control={invalid ? 'invalid' : ''}
  title={parsedHelperText}
>
  <div class="label">
    {label}
  </div>

  {@render children()}

  {#if parsedHelperText}
    <div class="helper">{parsedHelperText}</div>
  {/if}
</svelte:element>

<style lang="scss">
  .form-control {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 4px;

    &.required .label::after {
      order: 2;
      margin-left: 2px;
      color: var(--color-danger-dim);
      content: '*';
    }

    .helper {
      position: absolute;
      top: 100%;
      right: 4px;
      z-index: 10;
      display: none;
      max-width: 90%;
      margin-top: -4px;
      padding: 8px;
      color: var(--color-danger-dim);
      background-color: var(--color-neutral-bright);
      border-radius: 4px;
      box-shadow: var(--shadow-low);

      &::before {
        position: absolute;
        right: 8px;
        bottom: 100%;
        border: 6px solid transparent;
        border-bottom-color: var(--color-neutral-bright);
        content: '';
      }
    }

    &[data-form-control='invalid'] .helper {
      display: block;
    }
  }

  .label {
    display: flex;
    align-items: center;
    font-weight: 700;
    @apply text-base;

    @include m.xxs {
      @apply text-lg;
    }

    &::before {
      order: 1;
      content: ':';
    }
  }
</style>
