import Vue from 'vue';
import { v4 as generateId } from 'uuid';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@mdi/font/css/materialdesignicons.css';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import vuetify from '@/plugins/vuetify';
import '@/plugins/socket';
import '@/plugins/clipboard';

new Vue({
  router,
  store,
  vuetify,
  beforeCreate(): void {
    if (!store.state.player.id.length) {
      store.commit('SET_PLAYER_ID', generateId());
    }

    if (store.state.player.name) {
      this.$socket.client.emit('setPlayer', store.state.player);
    }
  },
  render: (h: Vue.CreateElement): Vue.VNode => h(App),
}).$mount('#app');

if (module.hot) {
  module.hot.addStatusHandler((status: string) => {
    if (status === 'prepare') {
      console.clear();
    }
  });
}
