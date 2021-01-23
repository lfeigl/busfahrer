import Vue from 'vue';
import Vuex from 'vuex';
import {
  StoreState,
  StoreActionContext,
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
      localStorage.setItem('username', username);
    },
  },
  actions: {
    async initializeState(context: StoreActionContext): Promise<void> {
      const username = localStorage.getItem('username');

      if (username) {
        context.commit('setUserName', username);
      }
    },
  },
});
