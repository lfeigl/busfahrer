import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import {
  StoreState,
} from '@/types';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    player: {
      id: '',
      name: '',
    },
  } as StoreState,
  mutations: {
    setPlayerId(state: StoreState, id: string): void {
      state.player.id = id;
    },
    setPlayerName(state: StoreState, name: string): void {
      state.player.name = name;
    },
  },
  actions: {

  },
  plugins: [
    createPersistedState({
      paths: [
        'player',
      ],
    }),
  ],
});
