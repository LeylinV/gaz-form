<template>
  <teleport to="body">
    <div class="app-modal tw-mx-1 tw-h-1/2 tw-w-full md:tw-w-1/2 md:tw-h-2/3" v-if="modelValue">
      <slot />
    </div>
    <div v-if="modelValue" @click="$emit('update:modelValue')" class="overlay"></div>
  </teleport>
</template>

<script>
export default {
  props: {
    modelValue: {
      default: false,
      type: Boolean,
    },
  },
  emits: ['update:modelValue'],
  watch: {
    modelValue(val) {
      if(val) document.body.style.overflow = 'hidden';
      else document.body.style.overflow = '';
    }
  }
};
</script>

<style scoped>
.app-modal {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  position: fixed;
  /* width: 100%;
  max-width: 650px;
  max-height: 440px; */
  padding: 20px;
  background: white;
  z-index: 999;
  @apply tw-rounded;
}

.overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgb(0 0 0 / 50%);
  top: 0;
  left: 0;
  z-index: 998;
}
</style>
