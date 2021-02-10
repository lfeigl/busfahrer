import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import router from '@/router';
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
    async socketRoomRemoved(context: StoreActionContext): Promise<void> {
      await router.push({
        name: 'Home',
      });

      context.commit('SET_ROOM', initialState.room);
      context.commit('SET_ACTIVE_DIALOG', {
        dialogName: 'roomRemoved',
        isActive: true,
      });
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
