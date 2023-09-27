import flatten from 'flat';
import useEmail from '@/compositions/useEmail';
import useUserData from '@/compositions/useUserData';
import useAddress from '@/compositions/useAddress';
import usePreloadForm from '@/compositions/usePreloadForm';
import { useForm } from 'vee-validate';
import { useStore } from 'vuex';
import { nextTick, ref } from 'vue';
import usePasteAddress from './usePasteAddress';

function scrollToFirstError(errors) {
  const errList = Object.keys(errors);

  if (errList.length <= 0) return;
  const el = document.getElementById(errList[0]);

  const elToScroll = el.parentElement.previousSibling;

  if (!elToScroll) return;
  elToScroll.scrollIntoView({ behavior: 'smooth' });
}

export default function (initialValues = {}, { social = false } = {}) {
  const loading = ref(false);
  const submitModal = ref(false);
  const store = useStore();

  const { values, validate, setErrors, resetForm, setFieldValue, setValues } = useForm();

  nextTick(() => resetForm({ values: initialValues }));

  const id = usePreloadForm(setValues);

  //usePasteAddress(() => values.personal_data.mailing_address, setFieldValue);


  const { getUserData } = useUserData();
  const handleUserData = (userdata) => {
    for (const [key, value] of Object.entries(userdata)) {
      if (value.length > 0) {
        setFieldValue(key, value);
      }
    }
  }

  // Если в режиме редактирования заявки, то не делаем запрос к данным пользователя, поскольку используем уже введенные данные
  if (id <= 0) {
    getUserData(handleUserData);
  }

  const { getAccountAddress } = useAddress();
  const handleAddress = (accountID) => {
    const handleAccountAddress = (address) => {
      setFieldValue("address", address);
    }
    if (accountID > 0) {
      getAccountAddress(handleAccountAddress, accountID);
    } else {
      setFieldValue("address", "");
    }
  }

  const handleDateInterval = (name, value) => {
    setFieldValue(name, value)
  }

  const handleResponse = (data) => {
    if (!Array.isArray(data.errors)) {
      const errors = flatten(data.errors);
      setErrors(errors);
      scrollToFirstError(errors);
    } else {
      submitModal.value = false;
      console.log('данные ответа', data);
      alert('Форма успешно отправлена');

      let postfix = '';
      if(+data?.post?.is_letter === 1) postfix = `${data.id}/edit/?id=${data.id}&letter=true`;

      //Раскоментировать!
      if(social) location.href = '/contract/requests/' + postfix;
      else location.href = '/contract/requests/' + postfix;
    }
  };

  const handleValidForm = async () => {
    const { errors, valid } = await validate();

    if (!valid) return scrollToFirstError(errors);

    submitModal.value = true;

  }

  const onSubmit = async (opts = {}) => {
    const { is_draft = 0, is_sign = 0, request_id = 0 } = opts;

    submitModal.value = false;

    if (is_draft === 0) {
      const { errors, valid } = await validate();
      if (!valid) return scrollToFirstError(errors);
    }

    loading.value = true;

    const data = await store.dispatch('complexForm/create', {
      id,
      edit: id >= 0 ? true : false,
      social,
      data: values,
      meta: { is_draft, is_sign, request_id },
    });

    handleResponse(data);

    loading.value = false;
  };

  return {
    onSubmit,
    submitModal,
    loading,
    handleValidForm,
    handleAddress,
    handleDateInterval
  };
}
