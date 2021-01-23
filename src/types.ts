import * as vuex from 'vuex';

export type StoreState = {
  user: User;
};

export type StoreActionContext = vuex.ActionContext<StoreState, StoreState>;

export type User = {
  id: string;
  name: string;
};
