<template>
  <div class="tw-relative">
    <AppLabel v-bind="{ label, for: name }" />
    <input
      v-bind="$attrs"
      autocomplete="off"
      class="app-input"
      :id="name"
      type="text"
      @focus="showing = true"
      @blur="showing = false"
      :value="value"
      @input="onInput"
    />
    <AppErrorMessage v-bind="{ name }" />
    <div
      v-if="showing"
      class="
        tw-absolute
        tw-w-full
        tw-z-10
        tw-border-b
        tw-border-x
        tw-border-gray-300
        tw-rounded-b-lg
        tw-max-h-44
        tw-overflow-scroll
      "
    >
      <div class="tw-p-2 tw-bg-white" v-if="value === ''">
        Начните вводить текст
      </div>
      <div
        v-else-if="loading"
        class="tw-p-2 tw-bg-white hover:tw-bg-slate-300 tw-cursor-pointer"
      >
        loading...
      </div>
      <template v-else>
        <div class="tw-bg-white tw-p-2" v-if="opts.length <= 0">
          Ничего не найдено
        </div>
        <div
          v-for="(opt, i) in opts"
          :key="i"
          @click="onClick(opt)"
          class="tw-p-2 tw-bg-white hover:tw-bg-slate-300 tw-cursor-pointer"
        >
          {{ opt.label }}
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import { Field, useField } from 'vee-validate';
import { ref, toRefs, computed } from 'vue';
import { throttle } from '@/utilities/perfomance';

export default {
  inheritAttrs: false,
  props: {
    ...Field.props,
    fetcher: {
      required: true,
      type: Function,
    },
    option: {
      default() {
        return (option) => option;
      },
      type: Function,
    },
  },
  setup(props) {
    const showing = ref(false);
    const options = ref([]);
    const loading = ref(false);
    const { label, rules, name } = toRefs(props);
    const { value, handleChange } = useField(name, rules, {
      validateOnValueUpdate: false,
      label,
    });

    const { value: current, handleChange: selectChange } = useField(
      computed(() => name.value + '-s'),
      '',
      // { standalone: true }
    );

    const opts = computed(() => {
      return options.value.map((opt) => ({ ...props.option(opt), meta: opt }));
    });

    const upload = throttle(async () => {
      if (value.value === '') return;

      try {
        loading.value = true;
        const loader = async () => props.fetcher(value.value);
        options.value = await loader();
      } catch (err) {
        console.error(err);
        alert('Произошла ошибка при загрузке данных!');
      } finally {
        loading.value = false;
      }
    }, 800);

    return {
      current,
      opts,
      loading,
      value,
      handleChange,
      selectChange,
      showing,
      onClick(opt) {
        handleChange(opt.value);
        selectChange(opt.meta);
        showing.value = false;
      },
      onInput(e) {
        loading.value = true;
        handleChange(e);
        upload();
      },
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
