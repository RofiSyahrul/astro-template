<script lang="ts">
  import BasePopup from '$lib/components/base-popup.svelte';

  let isOpen = $state(false);

  const handleButtonClick = () => {
    isOpen = true;
  };

  const handleOverlayClick = () => {
    isOpen = false;
  };
</script>

<button
  class="btn btn-solid btn-primary p-2"
  onclick={handleButtonClick}
>
  Trigger Popup
</button>

<BasePopup {isOpen} onOverlayClick={handleOverlayClick}>
  Popup Content
</BasePopup>
