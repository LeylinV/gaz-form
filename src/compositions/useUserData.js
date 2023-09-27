import { useStore } from 'vuex';

export default function () {
  const store = useStore();

  const getUserData = async (cb = () => {}) => {
    try {
      const data = await store.dispatch('complexForm/getUserData');
      if (data?.error) throw data.errorText;
      else {
        cb(data);
      }
    } catch(e) {
      console.log(e);
      alert("Не удалось получить данные пользователя");
    }
  };

  return {
    getUserData,
  };
}
