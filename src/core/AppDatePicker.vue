<script>
import { h, computed, toRefs, resolveComponent } from 'vue';
import { Field, useField } from 'vee-validate';
import useRules from '@/compositions/useRules';

export default {
  props: {
    ...Field.props,
  },
  setup(props) {
    const naitivePattern = /^(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})$/;
    const localePattern = /^(?<day>\d{2})\.(?<month>\d{2})\.(?<year>\d{4})$/;

    const { name, rules, label } = toRefs(props);

    const { value, handleChange, errorMessage } = useField(name, props.rules, {
      label: props.label,
    });

    const { hasRequiredRule } = useRules(rules);

    function naitiveFormat(value) {
      if (!value || typeof value !== 'string') return '';
      const match = value.match(localePattern);
      const groups = match?.groups || {};
      const { day = '', month = '', year = '' } = groups;
      if (!(day && month && year)) return '';
      return `${year}-${month}-${day}`;
    }

    function localeFormat(value) {
      if (!value) return '';
      const match = value.match(naitivePattern);
      const groups = match?.groups || {};
      const { day = '', month = '', year = '' } = groups;
      if (!(day && month && year)) return '';
      return `${day}.${month}.${year}`;
    }

    const dispalyVal = computed(() => naitiveFormat(value.value));

    const onInput = ({ target: { value } }) => {
      handleChange(localeFormat(value));
    };

    const AppErrMsg = resolveComponent('AppErrorMessage');
    const AppLabel = resolveComponent('AppLabel');

    return () => {
      const input = h('input', {
        id: props.name,
        class: 'app-input',
        type: 'date',
        onInput,
        value: dispalyVal.value,
      });

      return h('div', [
        h(AppLabel, {
          required: hasRequiredRule.value,
          label: props.label,
          for: props.name,
        }),
        input,
        errorMessage.value ? h(AppErrMsg, { msg: errorMessage.value }) : null,
      ]);
    };
  },
};
</script>

<style scoped>
.app-input {
  @apply tw-border tw-border-gray-400 tw-rounded-lg tw-h-8 tw-px-2 tw-block tw-w-full;
}
.app-input:hover,
.app-input:focus {
  @apply tw-border-primary;
}
</style>
