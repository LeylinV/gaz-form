<template>
  <teleport to="body">
    <div
      v-if="showing"
      style="z-index: 99999"
      class="
        tw-fixed
        tw-top-0
        tw-left-0
        tw-right-0
        tw-bottom-0
        tw-bg-black
        tw-bg-opacity-50
        tw-flex
        tw-justify-center
        tw-items-center
      "
    >
      <div class="tw-text-5xl tw-text-white">Идёт отправка, подождите...</div>
    </div>
  </teleport>
</template>

<script>
export default {
  props: {
    showing: {
      default: false,
      type: Boolean
    }
  }
};
</script>
