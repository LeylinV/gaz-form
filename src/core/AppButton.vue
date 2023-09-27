<template>
  <button v-bind="{ type }" :class="classes"><slot /></button>
</template>
<script>
export default {
  props: {
    size: {
      default: 'md',
      type: String,
    },
    color: {
      default: 'gazblue',
      type: String,
    },
    type: {
      default: 'button',
      type: String,
    },
  },
  computed: {
    colorClass() {
      return `tw-bg-${this.color}`;
    },
    paddingClass() {
      if (this.size === 'md') return 'tw-px-4 tw-py-3';
      else return 'tw-px-2 tw-py-1';
    },
    textClass() {
      if (this.size === 'md') return 'tw-text-base';
      else return 'tw-text-sm';
    },
    classes() {
      return (
        'app-btn tw-bg-[#0079c2]' +
        ' ' +
        this.colorClass +
        ' ' +
        this.paddingClass +
        ' ' +
        this.textClass
      );
    },
  },
};
</script>
<style scoped>
.app-btn {
  transition-duration: 300;
  @apply tw-rounded tw-text-white tw-font-medium tw-transition-colors tw-cursor-pointer;
}

.app-btn:hover {
  @apply tw-bg-sky-900;
}

.app-btn:active {
  @apply tw-bg-sky-900;
}
</style>
