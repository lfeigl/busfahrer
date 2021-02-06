import { ActionContext } from 'vuex';

export type StoreActionContext = ActionContext<StoreState, StoreState>;

export type StoreState = {
  busfahrerApp: BusfahrerApp;
  theme: string;
  activeDialogs: {
    [dialogName: string]: boolean;
  };
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
};

export type SetActiveDialogMutationPayload = {
  dialogName: string;
  isActive: boolean;
};

export type BusfahrerApp = {
  name: string;
  version: string;
  author: string;
  homepage: string;
};

export type Player = {
  id: string;
  name: string;
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
  players: {
    [playerId: string]: Player;
  };
};
