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
    display: flex;
    flex-direction: column;
    margin: -1px;
    overflow: hidden;
    padding: 2px;
    position: relative;
  }

  span {
    align-items: center;
    border: 1px solid var(--color-neutral-dim);
    border-radius: 32px;
    color: var(--color-neutral-dim);
    background-color: transparent;
    cursor: pointer;
    display: flex;
    gap: 6px;
    min-height: 36px;
    justify-content: center;
    text-align: center;
    padding: 4px 12px;
    user-select: none;
    width: 100%;
    @apply text-xs;

    @include m.xxs {
      @apply text-base;
    }
  }

  input {
    left: -9em;
    position: absolute;

    &:focus-visible + span {
      outline: 1px solid var(--color-neutral-dim);
      outline-offset: 1px;
    }

    &:hover + span {
      filter: brightness(0.6);
    }

    &:checked + span {
      background-color: var(--color-neutral-dim);
      color: var(--color-neutral-bright);
    }

    &:checked:hover + span {
      filter: brightness(0.8);
    }
  }
</style>
