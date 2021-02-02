import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import initialState from '@/store/initial-state';
import {
  StoreState,
  StoreActionContext,
  SetActiveDialogMutationPayload,
  Room,
  Player,
} from '@/types';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: initialState,
  mutations: {
    SET_THEME(state: StoreState, theme: string): void {
      state.theme = theme;
    },
    SET_ACTIVE_DIALOG(state: StoreState, payload: SetActiveDialogMutationPayload): void {
      state.activeDialogs[payload.dialogName] = payload.isActive;
    },
    SET_PLAYER_ID(state: StoreState, id: string): void {
      state.player.id = id;
    },
    SET_PLAYER_NAME(state: StoreState, name: string): void {
      state.player.name = name;
    },
    SET_ROOM(state: StoreState, room: Room): void {
      state.room = room;
    },
    ADD_PLAYER(state: StoreState, player: Player): void {
      Vue.set(state.room.players, player.id, player);
    },
    REMOVE_PLAYER(state: StoreState, player: Player): void {
      Vue.delete(state.room.players, player.id);
    },
  },
  actions: {
    socketPlayerJoinedRoom(context: StoreActionContext, player: Player): void {
      context.commit('ADD_PLAYER', player);
    },
    socketPlayerLeftRoom(context: StoreActionContext, player: Player): void {
      context.commit('REMOVE_PLAYER', player);
    },
    socketOwnerLeftRoom(context: StoreActionContext): void {
      context.commit('SET_ROOM', initialState.room);
    },
  },
  plugins: [
    createPersistedState({
      paths: [
        'theme',
        'player',
        'playerStats',
      ],
    }),
  ],
});
