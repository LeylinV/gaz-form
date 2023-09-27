<template>
  <div class="sm:tw-col-span-3">
    <div class="tw-relative tw-flex tw-gap-x-3">
      <div class="tw-flex tw-h-6 tw-items-center">
      <input
        class="tw-h-4 tw-w-4 tw-rounded tw-border-gray-300 tw-text-gazblue focus:tw-ring-gazblue"
        :id="name"
        :name="name"
        type="checkbox"
        :value="value"
        :checked="checked"
        @change="handleChange"
      />
      </div>

      <AppLabel
        class="tw-mt-1"
        :required="hasRequiredRule"
        :for="name"
        v-bind="{ label }"
      />

    </div>

    <AppErrorMessage v-if="errorMessage" msg="Поле обязательно для заполнения" />
  </div>
</template>

<script>
import { toRefs } from 'vue';
import useRules from '@/compositions/useRules';
import { Field, useField } from 'vee-validate';

export default {
  props: {
    ...Field.props,
    value: {
      type: null,
    },
  },
  setup(props) {
    const { rules } = toRefs(props);
    const { hasRequiredRule } = useRules(rules);
    const { errorMessage, handleChange, checked } = useField(
      props.name,
      props.rules,
      {
        type: 'checkbox',
        checkedValue: props.value,
      }
    );

    return {
      hasRequiredRule,
      errorMessage,
      checked,
      handleChange,
    };
  },
};
</script>
