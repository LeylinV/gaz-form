<template>
  <AppFormSection>
    <div class="tw-flex tw-space-x-3">
      <AppButton @click="$emit('handleValidForm')">Отправить</AppButton>
      <AppButton @click="$emit('submit', { is_draft: 1 })">
        Сохранить черновик
      </AppButton>
      <a href="/contract/requests/" title="Закрыть">
        <AppButton>Закрыть</AppButton>
      </a>
    </div>
  </AppFormSection>
</template>

<script>
export default {
  emits: ['submit', 'showModal', 'handleValidForm'],
};
</script>
