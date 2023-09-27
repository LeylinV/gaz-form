<template>
  <h2 class="tw-text-xl tw-font-semibold tw-leading-6 tw-text-gray-900" id="modal-title">
    Выберите способ представления заявки
  </h2>
  <div class="tw-mt-5">
    <AppRadioBlock name="witheds" :options="options" @selectedFromRadio="GetRadioValue" :defaultValue="1"/>
  </div>
  <br><br>
  <div class="tw-flex tw-space-x-3">
    <AppButton class="tw-w-1/3" @click="$emit('hideModal')">Отмена</AppButton>
    <AppButton class="tw-w-1/3" @click="$emit('submit', { is_sign: selected })">Далее</AppButton>
  </div>
</template>

<script>
  import { ref } from 'vue'

  export default {
    emits: ['submit', 'hideModal', 'selectedFromRadio'],
    props: ['radioValue', 'defaultValue'],
    methods: {
        GetRadioValue(value) {
          this.selected = value
        }
    },
    setup() {

      let selected = ref("")

      return {
        options: [
          {
            label: 'В электронном виде с электронной подписью',
            description: 'Вы можете подписать заявку электронной цифровой подписью с помощью мобильного приложения Госключ. В этом случае Вам не потребуется посещать офис компании для подписания заявки',
            value: 1,
          },
          {
            label: 'Направление электронной заявки (без электронной подписи заявителя)',
            description: 'Потребуется посетить офис компании для подписания заявки',
            value: 0,
          },
        ],
        selected,
      }
    },
  };
</script>

<style>
</style>
