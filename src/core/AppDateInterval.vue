<template>
  <div class="sm:tw-col-span-3">
    <Datepicker
        v-model="dates"
        range
        :partial-range="false"
        :text-input="textInputOptions"
        name="datepicker"
        :enable-time-picker="false"
        month-name-format="long"
        :format="format"
        locale="ru"
        select-text="Выбрать"
        cancel-text="Отмена"
        position="left"
        vertical
        :clearable="false"
        @update:model-value="handleDate"
        auto-apply
    >
      <template #dp-input="{ value, onInput, onEnter, onTab, onClear, onBlur, onKeypress, onPaste, isMenuOpen }">
        <AppInput
            type="text"
            :name="props.name"
            :rules="props.rules"
            :label="props.label"
            v-maska="'##.##.#### – ##.##.####'"
        />
      </template>
    </Datepicker>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import AppInput from "@/core/AppInput.vue";
import useComplexForm from "@/compositions/useComplexForm";

const props = defineProps({
  name: String,
  label: String,
  rules: String,
});

const dates = ref([new Date(), new Date()]);

const emits = defineEmits(['updateDate'])

const format = (dates) => {

  if (dates.length === 0) {
    return "";
  }

  const formattedDates = dates.map((date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  });

  return formattedDates.join(" – ");
};

const textInputOptions = {
  format: ['dd.MM.yyyy', 'dd.MM.yyyy'],
};

const handleDate = (val) => {
  emits('updateDate', props.name, format(val))
}

</script>

<style scoped>
.dp__main{
  font-family: UbuntuLight, sans-serif;
}
</style>
