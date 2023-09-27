<template>
  <div v-for="(option, index) in options" :key="index">
    <div class="tw-flex tw-items-center tw-gap-x-3">
      <input
        class="tw-h-4 tw-w-4 tw-border-gray-300 tw-text-gazblue tw-focus:ring-gazblue"
        :id="index"
        type="radio"
        :name="name"
        :value="option.value"
        :required="rules"
        v-model="selectedValue"
      />
      <label
        class="tw-block tw-leading-6 tw-text-gray-900"
        :for="index"
      >{{ option.label }}
        <span v-if="rules === 'required'" class="tw-text-primary" title="Обязательное поле"> *</span>
      </label>
    </div>
    <Alert class="tw-mt-2" v-show="selectedValue === option.value" :description="option.description" />
  </div>
</template>

<script>
  import { toRefs } from 'vue';
  import useRules from '@/compositions/useRules';
  import { Field } from 'vee-validate';
  import Alert from '@/components/Alert';

  export default {
    data() {
      return {
        selectedValue: "",
      }
    },
    watch: {
      selectedValue(newValue) {
        this.$emit('selectedFromRadio', newValue);
      }
    },
    props: {
      options: Array,
      name: String,
      rules: String,
      defaultValue: Number
    },
    emits: ['selectedFromRadio'],
    components: {
      Alert
    },
    mounted() {
      this.selectedValue = this.defaultValue
    }
  };
</script>
