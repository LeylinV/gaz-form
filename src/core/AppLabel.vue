<template>
  <label class="tw-block tw-text-sm tw-font-medium tw-leading-6 tw-text-gray-500">
    <slot>{{ label }}</slot>
    <abbr v-if="required" class="tw-text-red-600" title="Обязательное поле"> *</abbr>
  </label>
</template>

<script>
export default {
  props: {
    label: {
      default: undefined,
      type: String,
    },
    required: {
      default: false,
      type: Boolean
    }
  },
};
</script>
