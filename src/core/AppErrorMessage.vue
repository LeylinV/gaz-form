<template>
  <component
    :is="naitive ? 'ErrorMessage' : 'div'"
    v-bind="naitive ? { name } : {}"
    class="tw-text-red-700 tw-text-xs"
  >
    <slot>{{ msg }}</slot>
  </component>
</template>

<script>
import { h, resolveComponent } from 'vue';
export default {
  props: {
    msg: {
      default: '',
      type: String,
    },
    name: {
      default: '',
      type: String,
    },
  },
  setup(props) {
    const ErrMsg = resolveComponent('ErrorMessage');

    return () => {
      const msg = (text) =>
        h('p', { class: 'tw-mt-1 tw-text-red-500 tw-text-xs' }, text);

      if (props.name) {
        return h(
          ErrMsg,
          { name: props.name },
          {
            default: (props) => msg(props.message),
          }
        );
      }

      return msg(props.msg);
    };
  },
};
</script>
