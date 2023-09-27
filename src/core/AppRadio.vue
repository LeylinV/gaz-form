<template>
  <div class="tw-flex tw-items-center tw-space-x-2">
    <VField
      class="tw-w-auto"
      :id="$.uid"
      type="radio"
      v-bind="{ name, value, rules }"
      validateOnInput
    />
    <AppLabel
      class="tw-w-auto"
      :required="hasRequiredRule"
      :for="$.uid"
      v-bind="{ label }"
    />
  </div>
</template>

<script>
import { toRefs } from 'vue';
import useRules from '@/compositions/useRules';
import { Field } from 'vee-validate';

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

    return {
      hasRequiredRule,
    };
  },
};
</script>
