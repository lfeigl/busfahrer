import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import router from '@/router';
import initialState from '@/store/initial-state';
import {
  StoreState,
  StoreActionContext,
  SetDialogStateMutationPayload,
  Room,
  Player,
  PlayingCard,
} from '@/types';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: initialState,
  mutations: {
    SET_THEME(state: StoreState, theme: string): void {
      state.theme = theme;
    },
    SET_DIALOG_STATE(state: StoreState, payload: SetDialogStateMutationPayload): void {
      const {
        dialogName,
        isActive,
        data,
      } = payload;

      Vue.set(state.dialogs, dialogName, {
        isActive,
        data,
      });
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
    ADD_FIR_CARD(state: StoreState, firCard: PlayingCard): void {
      state.room.firCards.push(firCard);
    },
    SET_HAND(state: StoreState, hand: PlayingCard[]): void {
      state.game.hand = hand;
    },
    SET_DISTRIBUTABLE_GULPS(state: StoreState, distributableGulps: number): void {
      state.game.gulps.distributable = distributableGulps;
    },
    SET_AVAILABLE_GULPS(state: StoreState, availableGulps: number): void {
      state.game.gulps.available = availableGulps;
    },
  },
  actions: {
    socketPlayerJoinedRoom(context: StoreActionContext, player: Player): void {
      context.commit('ADD_PLAYER', player);
    },
    socketPlayerLeftRoom(context: StoreActionContext, player: Player): void {
      context.commit('REMOVE_PLAYER', player);
    },
    socketDealtHand(context: StoreActionContext, hand: PlayingCard[]): void {
      context.commit('SET_HAND', hand);
    },
    socketFlippedFirCard(context: StoreActionContext, firCard: PlayingCard): void {
      context.commit('ADD_FIR_CARD', firCard);
    },
    socketNewDistributableGulps(context: StoreActionContext, newDistributableGulps: number): void {
      const {
        distributable: oldDistributableGulps,
        available: availableGulps,
      } = context.state.game.gulps;
      const distributableGulpsDiff = newDistributableGulps - oldDistributableGulps;

      context.commit('SET_DISTRIBUTABLE_GULPS', newDistributableGulps);
      context.commit('SET_AVAILABLE_GULPS', availableGulps + distributableGulpsDiff);
    },
    async socketRoomRemoved(context: StoreActionContext): Promise<void> {
      await router.push({
        name: 'Home',
      });

      context.commit('SET_ROOM', initialState.room);
      context.commit('SET_DIALOG_STATE', {
        dialogName: 'roomRemoved',
        isActive: true,
      });
    },
    async socketGameStarted(): Promise<void> {
      await router.push({
        name: 'Play',
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
