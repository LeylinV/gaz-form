import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import { maska } from 'maska';

// vee-validate
import {
  Form,
  Field,
  FieldArray,
  ErrorMessage,
  configure,
  defineRule,
} from 'vee-validate';
import * as rules from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import ru from '@vee-validate/i18n/dist/locale/ru.json';
import clickOutside from './directives/click-outside';

const incRules = ['required', 'email', 'numeric', 'digits', 'length'];

incRules.forEach((rule) => {
  defineRule(rule, rules[rule]);
});

configure({
  generateMessage: localize({ ru }),
});

setLocale('ru');
// end vee-validate

const app = createApp(App);

app.config.globalProperties.$accept = 'image/png,image/jpeg,application/pdf';

app.directive('maska', maska);
app.use(clickOutside);

(function registrGlobally() {
  app.component('VForm', Form);
  app.component('VField', Field);
  app.component('FieldArray', FieldArray);
  app.component('ErrorMessage', ErrorMessage);

  const context = require.context('./core', false, /App[A-Z]\w+\.(js|vue)$/);

  context.keys().forEach((filePath) => {
    const componentConfig = context(filePath);
    const componentName = filePath
      .split('/')
      .pop()
      .replace(/\.\w+$/, '');

    app.component(componentName, componentConfig.default || componentConfig);
  });
})();

app.use(store);
app.mount('#app');
