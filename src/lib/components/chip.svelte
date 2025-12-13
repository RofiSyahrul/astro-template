<script lang="ts">
  interface ChipProps {
    checked?: boolean;
    inputType?: 'radio' | 'checkbox';
    label: string;
    name: string;
    required?: boolean;
    value: string;
  }

  let {
    checked = $bindable(false),
    inputType = 'radio',
    label,
    name,
    required = false,
    value,
  }: ChipProps = $props();
</script>

<label>
  <input type={inputType} {checked} {required} {name} {value} />
  <span>
    {label}
  </span>
</label>

<style lang="scss">
  label {
    position: relative;
    display: flex;
    flex-direction: column;
    margin: -1px;
    padding: 2px;
    overflow: hidden;
  }

  span {
    display: flex;
    gap: 6px;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 36px;
    padding: 4px 12px;
    color: var(--color-neutral-dim);
    text-align: center;
    background-color: transparent;
    border: 1px solid var(--color-neutral-dim);
    border-radius: 32px;
    cursor: pointer;
    user-select: none;
    @apply text-xs;

    @include m.xxs {
      @apply text-base;
    }
  }

  input {
    position: absolute;
    left: -9em;

    &:focus-visible + span {
      outline: 1px solid var(--color-neutral-dim);
      outline-offset: 1px;
    }

    &:hover + span {
      filter: brightness(0.6);
    }

    &:checked + span {
      color: var(--color-neutral-bright);
      background-color: var(--color-neutral-dim);
    }

    &:checked:hover + span {
      filter: brightness(0.8);
    }
  }
</style>
