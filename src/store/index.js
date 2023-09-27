import { createStore } from 'vuex';

export default createStore({
  modules: {
    complexForm: require('./complexForm').default
  },
});
