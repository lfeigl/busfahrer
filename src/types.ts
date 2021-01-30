import { ActionContext } from 'vuex';

export type StoreState = {
  theme: string;
  player: Player;
  room: Room;
};

export type StoreActionContext = ActionContext<StoreState, StoreState>;

export type Player = {
  id: string;
  name: string;
};

export type Room = {
  id: string;
  name: string;
  owner: string;
  isOpen: boolean;
  players: Player[];
};
