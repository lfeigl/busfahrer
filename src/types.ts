import { ActionContext } from 'vuex';

export type StoreState = {
  theme: string;
  player: Player;
};

export type StoreActionContext = ActionContext<StoreState, StoreState>;

export type Player = {
  id: string;
  name: string;
};
