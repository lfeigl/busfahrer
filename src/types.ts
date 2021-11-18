import { ActionContext } from 'vuex';

export type BusfahrerApp = {
  name: string;
  version: string;
  author: string;
  homepage: string;
};

export type PlayingCard = {
  name: string;
  suit: string;
  value: number;
}

export type Player = {
  id: string;
  name: string;
  playFinished?: boolean;
};

export type Players = {
  [id: string]: Player;
};

export type PlayerStat = {
  key: string;
  value: number;
  groupName: string;
};

export type FormattedPlayerStat = {
  key: string;
  value: number;
  title: string;
};

export type FormattedPlayerStatsGroup = {
  stats: FormattedPlayerStat[];
  icon: string;
};

export type Room = {
  id: string;
  name: string;
  isOpen: boolean;
  owner: Player;
  players: Players;
  firCards: PlayingCard[],
};

export type StoreState = {
  busfahrerApp: BusfahrerApp;
  theme: string;
  dialogs: {
    [dialogName: string]: {
      isActive: boolean,
      data?: unknown,
    },
  },
  player: Player;
  playerStats: {
    [statKey: string]: PlayerStat;
  };
  playerStatsFormatting: {
    groupIcons: {
      [groupName: string]: string;
    };
    titles: {
      [statKey: string]: string;
    };
  };
  room: Room;
  game: {
    hand: PlayingCard[],
    gulps: {
      distributable: number;
      available: number;
    },
  },
};

export type SetDialogStateMutationPayload = {
  dialogName: string;
  isActive: boolean;
  data?: unknown;
};

export type StoreActionContext = ActionContext<StoreState, StoreState>;
