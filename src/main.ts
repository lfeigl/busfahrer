import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import vuetify from '@/plugins/vuetify';
import '@/plugins/socket';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@mdi/font/css/materialdesignicons.css';

new Vue({
  router,
  store,
  vuetify,
  render: (h: Vue.CreateElement) => h(App),
}).$mount('#app');

if (module.hot) {
  module.hot.addStatusHandler((status: string) => {
    if (status === 'prepare') {
      console.clear();
    }
  });
}
