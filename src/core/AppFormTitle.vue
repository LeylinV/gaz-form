<template>
  <component
    :is="`h${level}`"
    class="tw-text-neutral-800 tw-mb-6"
    :class="{
      'tw-text-2xl': level === '2',
      'tw-text-lg': level === '3',
      'tw-mb-6': level === '2',
      'tw-mb-3': level === '3',
    }"
  >
    <slot />
  </component>
</template>

<script>
export default {
  props: {
    level: {
      default: '2',
      type: String,
    },
  },
};
</script>

<style>
</style>
