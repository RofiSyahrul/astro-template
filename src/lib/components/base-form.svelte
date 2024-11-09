<script lang="ts" module>
  import type { Snippet } from 'svelte';
  import type { EventHandler } from 'svelte/elements';

  export type FieldElement = HTMLInputElement | HTMLTextAreaElement;

  type InputFieldHandler = (params: {
    field: FieldElement;
    form: HTMLFormElement;
  }) => void;

  interface BaseFormProps {
    action?: string;
    children: Snippet;
    id?: string;
    method?: 'get' | 'post';
    name?: string;
    onInputField?: InputFieldHandler;
    onSubmit?: EventHandler<SubmitEvent, HTMLFormElement>;
  }

  const INVALID = 'invalid';

  function isFieldElement(
    target: EventTarget | null,
  ): target is FieldElement {
    return (
      target instanceof HTMLInputElement ||
      target instanceof HTMLTextAreaElement
    );
  }

  function handleInvalidField(field: FieldElement) {
    const fieldset = field.closest('fieldset');
    if (fieldset) {
      fieldset.classList.add(INVALID);
    } else {
      field.classList.add(INVALID);
    }

    const formControl = field.closest('[data-form-control]');
    if (formControl instanceof HTMLElement) {
      formControl.dataset.formControl = INVALID;
    }
  }

  function handleValidField(field: FieldElement) {
    const fieldset = field.closest('fieldset');
    if (fieldset) {
      fieldset.classList.remove(INVALID);
    } else {
      field.classList.remove(INVALID);
    }

    const formControl = field.closest('[data-form-control]');
    if (formControl instanceof HTMLElement) {
      formControl.dataset.formControl = '';
    }
  }
</script>

<script lang="ts">
  const {
    action,
    children,
    id,
    method = 'post',
    name,
    onInputField,
    onSubmit,
  }: BaseFormProps = $props();

  let form = $state<HTMLFormElement>();

  export function getElement() {
    return form;
  }

  function handleInput(this: HTMLFormElement, event: Event) {
    const target = event.target;
    if (isFieldElement(target)) {
      if (target.validity.valid) {
        handleValidField(target);
      } else {
        handleInvalidField(target);
      }

      onInputField?.({ field: target, form: this });

      if (target.validity.valid) {
        handleValidField(target);
      }
    }
  }

  function handleInvalid(this: HTMLFormElement, event: Event) {
    event.preventDefault();
    const target = event.target;
    if (isFieldElement(target)) {
      handleInvalidField(target);
    }
  }
</script>

<form
  {action}
  {id}
  {method}
  {name}
  bind:this={form}
  oninputcapture={handleInput}
  oninvalidcapture={handleInvalid}
  onsubmit={onSubmit}
>
  {@render children()}
</form>
