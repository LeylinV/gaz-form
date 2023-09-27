import { useField, useForm } from 'vee-validate';
import { useStore } from 'vuex';
import { getPrettyDate } from '@/helpers';

export default function (setValues) {
  const store = useStore();
  const params = new URLSearchParams(window.location.search);
  let id = params.get('id');
  if (typeof id !== 'string') return 0;
  if (!/^[0-9]+$/g.test(id)) return 0;

  //useField('uploadedFiles');

  show();

  return id;

  function getName(src) {
    return src.substr(src.lastIndexOf('/') + 1);
  }

  async function getFile(fileId) {
    try {
      const { file } = await store.dispatch('complexForm/showFiles', { fileId });
      return getName(file.src);
    } catch(e) {
      console.log(e);
      return undefined;
    }
  }

  async function upload(fileList) {
    const idFilter = id => id !== 0;
    const names = await Promise.all(fileList.filter(idFilter).map(getFile));
    return names.filter(name => name !== undefined);
  }

  async function uploadDocuments(documents) {
    const filledDocs = Object.entries(documents).filter(([_key, fileList]) => fileList.length > 0);
    const uploadedDocs = await Promise.all(
      filledDocs.map(async ([key, fileList]) => {
        const names = await upload(fileList);
        return [key, names];
      })
    );

    const mocks = uploadedDocs.map(([key]) => {
      return [key, null]
    });

    const docMocks = Object.fromEntries(mocks);
    const docNames = Object.fromEntries(uploadedDocs);

    return {
      docMocks,
      docNames
    }
  }

  async function uploadAttached(attached) {
    if(!attached) return null;
    const attachedNames = await upload(attached);
    return attachedNames;
  }

  function converToDate(timestamp) {
    return new Date(timestamp * 1000);
  }

  function isDateFormat(value) {
    const pattern = /^\d{2}\.\d{2}\.\d{4}$/i;
    return pattern.test(value);
  }

  function displayDate(timestamp) {
    if(!timestamp) return '';
    if(isDateFormat(timestamp)) return timestamp;

    timestamp = +timestamp;
    if(isNaN(timestamp) || timestamp === -1) return '';
    return getPrettyDate(converToDate(timestamp)).value
  }

  function replaceDates(formParts) {
    const { primary_information, object_data } = formParts;

    if(primary_information.tu_date) {
      primary_information.tu_date = displayDate(primary_information.tu_date)
    }

    if(object_data.commissioning_date) {
      object_data.commissioning_date = displayDate(object_data.commissioning_date);
    }

    if(object_data.approximate_date) {
      object_data.approximate_date = displayDate(object_data.approximate_date);
    }

    if(object_data.object_stages && Array.isArray(object_data.object_stages)) {
      object_data.object_stages = object_data.object_stages.map(({ design_time, input_date }) => ({
        design_time: displayDate(design_time),
        input_date: displayDate(input_date)
      }))
    }
  }

  async function show() {
    try {
      const { request: { data, files, comment } } = await store.dispatch('complexForm/show', { id: +id });

      let filesData = ''

      if (files.length > 0) {
        filesData = await store.dispatch('complexForm/getFilesData', { file: files });
      }

      const values = {
        ...data,
        comment,
        files: filesData,
        uploaded_files: (files.length > 0) ? files.join() : ''  // Для скрытого поля uploaded_files в который передаются ID шники уже загруженных файлов заявки
      };

      setValues(values); 


    } catch(e) {
      console.log(e);
      alert('не удалось загрузить данные формы');
    }
  }
}
