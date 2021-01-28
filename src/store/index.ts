import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import {
  StoreState,
} from '@/types';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    theme: 'dark',
    player: {
      id: '',
      name: '',
    },
  } as StoreState,
  mutations: {
    SET_THEME(state: StoreState, theme: string): void {
      state.theme = theme;
    },
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
        'theme',
        'player',
      ],
    }),
  ],
});
