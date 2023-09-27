<template>
  <section class="complex-form__section tw-py-8 tw-border-gray-500">
    <slot />
  </section>
</template>

<script>
export default {};
</script>
<style scoped>
.complex-form__section + .complex-form__section {
  @apply tw-border-t-2;
}
</style>
