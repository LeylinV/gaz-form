<script>
import {
  h,
  computed,
  toRefs,
  resolveComponent,
  resolveDirective,
  withDirectives,
  watch,
} from 'vue';
import { Field, useField } from 'vee-validate';
import useRules from '@/compositions/useRules';

export default {
  props: {
    ...Field.props,
    type: {
      default: 'text',
      type: String,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
  },
  setup(props, { expose }) {
    const AppErrMsg = resolveComponent('AppErrorMessage');
    const AppLabel = resolveComponent('AppLabel');
    const vmaska = resolveDirective('maska');

    const { type, label, rules, name, disabled } = toRefs(props);
    const { value, errorMessage, handleChange } = useField(name, rules, {
      validateOnValueUpdate: true,
      label: props.label,
    });


    expose({ handleChange });

    const isTextArea = computed(() => type.value === 'textarea');
    const { hasRequiredRule } = useRules(rules);

    return () => {
      const inputSrc = h(isTextArea.value ? 'textarea' : 'input', {
        disabled: disabled.value,
        id: props.name,
        name: props.name,
        class: ['tw-block tw-w-full tw-rounded-md tw-border-0 tw-py-1.5 tw-text-gray-900 tw-shadow-sm tw-ring-1 tw-ring-inset tw-ring-gray-300 placeholder:tw-text-gray-400 focus:tw-ring-2 focus:tw-ring-inset focus:tw-ring-gazblue sm:tw-text-sm sm:tw-leading-6', { 'app-input--textarea': isTextArea.value }],
        type: type.value === 'date' ? 'text' : type.value,
        value: value.value,
        onInput: handleChange,
      });

      let input = inputSrc;

      if (props.type === 'tel') {
        input = withDirectives(inputSrc, [[vmaska, '+7(###)###-##-##']]);
      } else if(props.type === 'date') {
        input = withDirectives(inputSrc, [[vmaska, '##.##.####']])
      }

      if (props.type === 'hidden') {
        return input
      } else {
        return h('div', {class: 'sm:tw-col-span-3'}, [
          h(AppLabel, {
            required: hasRequiredRule.value,
            label: label.value,
            for: props.name,
          }),
          h(
            'div', {class: 'tw-mt-1'}, [
            input,
            ]
          ),

          errorMessage.value ? h(AppErrMsg, { msg: errorMessage.value }) : null,
        ]);
      }
    };
  },
};
</script>

<style scoped>
.app-input--textarea {
  min-height: 84px;
}

.app-input--textarea {
  @apply tw-h-16;
}
</style>
