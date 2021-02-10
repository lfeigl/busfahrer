import { StoreState } from '@/types';

const initialState: StoreState = {
  busfahrerApp: {
    name: process.env.VUE_APP_NAME,
    version: process.env.VUE_APP_VERSION,
    author: process.env.VUE_APP_AUTHOR,
    homepage: process.env.VUE_APP_HOMEPAGE,
  },
  theme: 'dark',
  activeDialogs: {
    welcome: false,
    removeRoom: false,
    roomRemoved: false,
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
  },
};

export default initialState;
