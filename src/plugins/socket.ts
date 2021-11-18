import Vue from 'vue';
import VueSocketIOExt from 'vue-socket.io-extended';
import socketIOClient from 'socket.io-client';
import { constantCase, pascalCase } from 'change-case';
import store from '@/store';

Vue.use(VueSocketIOExt, socketIOClient(), {
  store,
  actionPrefix: 'socket',
  eventToMutationTransformer: (eventName: string): string => constantCase(eventName),
  eventToActionTransformer: (eventName: string): string => pascalCase(eventName),
});
