import { useStore } from 'vuex';

export default function () {
  const store = useStore();

  const getAccountAddress = async (actionFunc = () => {}, accountID) => {
    try {
      const data = await store.dispatch('complexForm/getAccountAddress', {accountID});
      if (data?.error) throw data.errorText;
      else {
        actionFunc(data);
      }
    } catch(e) {
      console.log(e);
      alert("Не удалось получить адрес по лицевому счету. Введите адрес вручную.");
    }
  };

  return {
    getAccountAddress,
  };
}
