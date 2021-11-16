import { StoreState } from '@/types';

const initialState: StoreState = {
  busfahrerApp: {
    name: process.env.VUE_APP_NAME ? process.env.VUE_APP_NAME
      : 'Busfahrer',
    version: process.env.VUE_APP_VERSION ? process.env.VUE_APP_VERSION
      : '0.0.0',
    author: process.env.VUE_APP_AUTHOR ? process.env.VUE_APP_AUTHOR
      : 'Luca Feigl',
    homepage: process.env.VUE_APP_HOMEPAGE ? process.env.VUE_APP_HOMEPAGE
      : 'https://github.com/lfeigl/busfahrer',
  },
  theme: 'dark',
  dialogs: {
    invalidPlay: {
      isActive: false,
    },
    joinRejected: {
      isActive: false,
    },
    removeRoom: {
      isActive: false,
    },
    roomRemoved: {
      isActive: false,
    },
    welcome: {
      isActive: false,
    },
  },
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
    firCards: [],
  },
  hand: [],
  game: {
    gulps: {
      distributable: 0,
      available: 0,
    },
  },
};

export default initialState;
