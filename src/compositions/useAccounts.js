import { useStore } from 'vuex';

export default function () {
  const store = useStore();

  const getAccounts = async (cb = () => {}) => {
    try {
      const data = await store.dispatch('complexForm/getAccounts');
      if (data?.error) throw data.errorText;
      else {
        cb(data);
      }
    } catch(e) {
      console.log(e);
      alert("Не удалось получить лицевые счета пользователя");
    }
  };

  return {
    getAccounts,
  };
}
