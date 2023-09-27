<template>
  <div class="sm:tw-col-span-3">
    <span class="tw-block tw-text-sm tw-font-medium tw-leading-6 tw-text-gray-500">{{ label }}<abbr v-if="hasRequiredRule" class="tw-text-red-600" title="Обязательное поле"> *</abbr></span>
    <input name="removed_files_id" type="hidden" ref="removedFilesID">
    <VField v-bind="{ name, rules, label }" v-slot="{ handleChange, errorMessage }">
      <div class="tw-flex tw-items-center tw-justify-center tw-w-full">
          <label :for="name" class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-w-full tw-h-38 tw-border-2 tw-border-gray-300 tw-border-dashed tw-rounded-lg tw-cursor-pointer tw-bg-gray-50 dark:hover:tw-bg-bray-800 dark:tw-bg-gray-700 hover:tw-bg-gray-100 dark:tw-border-gray-600 dark:hover:tw-border-gray-500 dark:hover:tw-bg-gray-600">
              <div class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-pt-5 tw-pb-6">
                  <svg aria-hidden="true" class="tw-w-10 tw-h-10 tw-mb-3 tw-text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                  <p class="tw-mb-2 tw-text-sm tw-text-gray-500 dark:tw-text-gray-400"><span class="tw-font-semibold">Нажмите чтобы загрузить</span> или перетащите файлы сюда</p>
                  <p class="tw-text-xs tw-text-gray-500 dark:tw-text-gray-400">JPG, PNG, DOC, DOCX, PDF (максимум 4 файла в сумме не более 20 мб)</p>
              </div>
              <input ref="fileInput" v-bind="$attrs" :id="name" type="file" :name="name" @change="onChange($event, handleChange)" :accept="accept" class="tw-hidden" />
          </label>
      </div>
      <div v-if="data_files.length != 0" class="tw-flex tw-mt-3 tw-items-baseline tw-space-x-4">
        <div v-for="(file, index) in data_files" :key="index" href="#" class="tw-flex tw-text-sm tw-leading-6 tw-text-gray-600 tw-justify-between">
          <a :href="this.data_files_link[index]" class="tw-text-gazblue" title="Скачать" target="_blank">{{ file.name }}</a><span v-if="data_original_name[index]" class="tw-pl-2"> [ {{ data_original_name[index] }} ]</span>
          <a href="javascript:;" @click="removeFile(index, handleChange)">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="tw-text-red-600" viewBox="0 0 16 16">
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
            </svg>
          </a>
      </div>
      </div>
      <AppErrorMessage v-if="errorMessage" :msg="errorMessage" />
    </VField>


  </div>
</template>
<script>
import { Field, useFieldValue, useField } from 'vee-validate';
import useRules from '@/compositions/useRules';
import { toRef, ref } from '@vue/reactivity';

export default {
  inheritAttrs: false,
  props: {
    ...Field.props,
    filename: {
      default: undefined,
      type: [Array, String]
    },
    accept: String,
  },
  data() {
    return {
      data_files: [],
      data_files_size: 0,
      data_original_name: [],
      data_files_link: [],
      data_files_bx_id: [],
      data_removed_files_id: [],
    }
  },
  setup(props) {
    const fileName = ref([]);
    const rules = toRef(props, 'rules');
    const { hasRequiredRule } = useRules(rules);

    const value = useFieldValue(props.name);

    return {
      hasRequiredRule,
      fileName,
      value
    };
  },
  methods: {
    onChange(e, handleChange) {

      const maxSizeFiles = 20971520;
      const maxLimitFiles = 4;
      const files = e.target.files;
      const validFileTypes = ['image/jpeg', 'image/png', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

      if(!files || files.length <= 0) return;
 
      if(files.length > maxLimitFiles || this.data_files.length > maxLimitFiles - 1) {
        alert("Для загрузки вложений, допустимо максимально 4 файла");
        return;
      }

      for (var i = 0; i < files.length; i++ ) {
        if(validFileTypes.includes(files[i]['type'])) {

          if (this.data_files_size + files[i]['size'] > maxSizeFiles) {
            alert("Превышена допустимая сумма размера файлов 20 мегабайт");
            return;
          }

          this.data_files_size += files[i]['size'];
          this.data_files.push(files[i]);

        } else {
          alert("Неверный тип файла. Допустимые расширения файлов: JPG, PNG, DOC, DOCX, PDF");
        }
      }

      handleChange(this.data_files);


    },
    parseFiles(files) {
      if(!files) return;

      if(files instanceof File) return this.fileName = [files.name];

      this.fileName = [];
      for(let file of files) {
        this.fileName.push(file.name);
      }
    },
    removeFile(index, handleChange) {

      let fileSize = this.data_files[index]['size'];
      this.data_files_size = this.data_files_size - fileSize
      this.data_files.splice(index, 1);
      this.data_files_link.splice(index, 1);
      this.data_original_name.splice(index, 1);
      this.data_removed_files_id.push(this.data_files_bx_id[index])

      const dataTransfer = new DataTransfer();

      for (let i = 0; i < this.data_files.length; i++ ) {
        dataTransfer.items.add(this.data_files[i]);
      }


      this.$refs.removedFilesID.value = this.data_removed_files_id;

      handleChange(dataTransfer.files);
    }
  },
  watch: {
    value: {
      async handler(files) {

        if (files) {
          for (let i = 0; i < files.length; i++ ) {
            
            // Если в режиме редактирования подгружаются файлы
            if (!(files[i] instanceof File)) {

              let blob = await fetch("/logo.png").then((response) => response.blob());

              let fileblob = await blob;

              let file = new File([fileblob], files[i]['name'], {type: files[i]['type']})

              this.data_files_link[i] = files[i]['src'];  // Записываем ссылку до файла
              this.data_original_name[i] = files[i]['original_name'];  //Записываем оригинальные имена файлов в отдельный массив
              this.data_files_bx_id[i] = files[i]['id'];  // ID файлов в хайлоадблоке File
              files[i] = file; //Перезаписываем обычный массив файла в File()
              this.data_files_size += files[i]['size'];
              this.data_files.push(file);

            }

          }
        }

      },
      immediate: true
    },
    filename(val) {
      if(!val) return;
      if(Array.isArray(val)) {
        this.fileName = val;
      } else {
        this.fileName = [val];
      }
    }
  },
};
</script>
