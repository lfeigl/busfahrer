import { ActionContext } from 'vuex';

export type StoreActionContext = ActionContext<StoreState, StoreState>;

export type StoreState = {
  theme: string;
  player: Player;
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

export type Player = {
  id: string;
  name: string;
  stats: {
    [key: string]: PlayerStat;
  };
};

export type PlayerStat = {
  key: string;
  value: number;
  groupName: string;
};

export type Room = {
  id?: string;
  name?: string;
  owner?: string;
  isOpen?: boolean;
  players?: Player[];
};
