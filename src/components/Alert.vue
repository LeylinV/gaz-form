<template>
	<div class="tw-ring-inset tw-ring-1 tw-p-3 tw-my-2 tw-ring-blue-200 tw-rounded-md tw-bg-sky-100 tw-text-gray-600 tw-text-sm" role="alert">
		<slot>{{ description }}</slot>
	</div>
</template>

<script>
export default {
  props: {
    description: {
      default: undefined,
      type: String,
    },
  },
};
</script>