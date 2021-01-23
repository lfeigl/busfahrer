import Vue from 'vue';
import VueSocketIOExt from 'vue-socket.io-extended';
import socketIOClient from 'socket.io-client';
import store from '@/store';

Vue.use(VueSocketIOExt, socketIOClient.io(), {
  store,
});
