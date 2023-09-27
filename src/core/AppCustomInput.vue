<template>
	<div class="sm:tw-col-span-3">
		<label class="tw-block tw-text-sm tw-font-medium tw-leading-6 tw-text-gray-500" :for="name">{{ label }}
		</label>
		<div class="tw-mt-1">
			<input :id="name" :name="name" class="tw-block tw-w-full tw-rounded-md tw-border-0 tw-py-1.5 tw-text-gray-900 tw-shadow-sm tw-ring-1 tw-ring-inset tw-ring-gray-300 placeholder:tw-text-gray-400 focus:tw-ring-2 focus:tw-ring-inset focus:tw-ring-gazblue sm:tw-text-sm sm:tw-leading-6" :type="type" :value="value">
		</div>
	</div>
</template>

<script>
	import { Field, useField, useForm } from 'vee-validate';
	import { toRefs } from 'vue';


	export default {
	  props: {
	    ...Field.props,
	    name: String,
	    type: String,
	    value: {
		      default() {
		        return "pepepep"
		      },
	    	type: String
	    }
	  },
	  setup(props) {
	  	const { type, label, rules, name, disabled } = toRefs(props);
    	const { value } = useField(name);

    	return {
	  		value: value
	  	}
	  }
	}
</script>