<template>
  <EmptyForm />
</template>

<script>
import EmptyForm from '@/components/EmptyForm';

export default {
  name: 'App',
  components: {
    EmptyForm
  },
};
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;


@layer base {
  body {
    @apply tw-font-ubuntu tw-text-base tw-p-8;
  }

  abbr {
    text-decoration: none;
  }

  #app select {
    height: inherit;
    line-height: inherit;
  }


}
</style>
