import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import {
  StoreState,
} from '@/types';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      id: '',
      name: '',
    },
  } as StoreState,
  mutations: {
    setUserId(state: StoreState, userId: string): void {
      state.user.id = userId;
    },
    setUserName(state: StoreState, username: string): void {
      state.user.name = username;
    },
  },
  actions: {

  },
  plugins: [
    createPersistedState({
      paths: [
        'user',
      ],
    }),
  ],
});
