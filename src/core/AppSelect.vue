<template>
  <div class="sm:tw-col-span-3">
    <AppLabel v-bind="{ label }" :for="name" :required="hasRequiredRule" />
    <div class="tw-mt-1">
      <select v-bind="$attrs" :id="name" class="tw-block tw-w-full tw-rounded-md tw-border-0 tw-bg-white tw-py-1.5 tw-text-gray-900 tw-shadow-sm sm:tw-text-sm tw-ring-1 tw-ring-inset tw-ring-gray-300 focus:tw-ring-2 focus:tw-ring-inset focus:tw-ring-gazblue" @change="onChange">
        <option :selected="currentVal === ''" :disabled="cantEmpty" value="">Выберите из списка</option>
        <option
          v-for="(option, i) in options"
          :key="i"
          :value="option.value"
          :selected="currentVal === option.value"
        >
          {{ option.label }}
        </option>
      </select>
    </div>
    <AppErrorMessage v-if="errorMessage" :msg="errorMessage" />
    <AppErrorMessage v-if="options.length <= 0" :msg="infomessage" />
  </div>
</template>

<script>
import { useField, Field } from 'vee-validate';
import { computed, toRefs } from 'vue';
import useRules from '@/compositions/useRules';

export default {
  props: {
    ...Field.props,
    cantEmpty: {
      default: false,
      type: Boolean
    },
    options: {
      default() {
        return [
          { label: 'Нет', value: '1' },
          { label: 'Да', value: '2' },
        ];
      },
      type: Array,
    },
    infomessage: String
  },
  emits: ['selectFromSelect'],
  setup(props, context) {
    const { rules, name } = toRefs(props);
    const { value, errorMessage, handleChange } = useField(name, props.rules, { label: props.label });
    const { hasRequiredRule } = useRules(rules);

    const currentVal = computed(() => value.value || '');

    context.emit('selectFromSelect');

    const onChange = (e) => {
      handleChange(e.target.value);
      context.emit('selectFromSelect', e.target.value);
    };

    return {
      onChange,
      currentVal,
      errorMessage,
      hasRequiredRule,
    };
  },
};
</script>
