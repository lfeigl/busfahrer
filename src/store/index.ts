import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import {
  StoreState,
  Room,
} from '@/types';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    theme: 'dark',
    player: {
      id: '',
      name: '',
    },
    playerStats: {
      totalGames: {
        key: 'totalGames',
        value: 0,
        groupName: 'games',
      },
      totalBusfahrer: {
        key: 'totalBusfahrer',
        value: 0,
        groupName: 'games',
      },
      totalGulpsReceived: {
        key: 'totalGulpsReceived',
        value: 0,
        groupName: 'gulpsReceived',
      },
      averageGulpsReceived: {
        key: 'averageGulpsReceived',
        value: 0,
        groupName: 'gulpsReceived',
      },
      totalGulpsDispensed: {
        key: 'totalGulpsDispensed',
        value: 0,
        groupName: 'gulpsDispensed',
      },
      averageGulpsDispensed: {
        key: 'averageGulpsDispensed',
        value: 0,
        groupName: 'gulpsDispensed',
      },
    },
    playerStatsFormatting: {
      groupIcons: {
        games: '🚍',
        gulpsReceived: '🍺',
        gulpsDispensed: '🍻',
      },
      titles: {
        totalGames: 'Busfahrten',
        totalBusfahrer: 'davon Busfahrer gewesen',
        totalGulpsReceived: 'Schlücke bekommen',
        averageGulpsReceived: '∅ Schlücke pro Fahrt',
        totalGulpsDispensed: 'Schlücke verteilt',
        averageGulpsDispensed: '∅ Schlücke pro Fahrt',
      },
    },
    room: {
      id: '',
      name: '',
      isOpen: false,
      owner: {
        id: '',
        name: '',
      },
      players: {},
    },
  } as StoreState,
  mutations: {
    SET_THEME(state: StoreState, theme: string): void {
      state.theme = theme;
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
  },
  actions: {

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
