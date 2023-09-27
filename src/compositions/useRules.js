import { computed } from 'vue';

export default function (rules) {
  const hasRequiredRule = computed(() => {
    if (!rules.value) return false;
    return rules.value.indexOf('required') !== -1;
  });

  return {
    hasRequiredRule,
  };
}
