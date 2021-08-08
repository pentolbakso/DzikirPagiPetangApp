import { createModel } from '@rematch/core';
import { RootModel } from '.';

type AppState = {
  firstTimeUser: boolean;
};

export const app = createModel<RootModel>()({
  state: {
    firstTimeUser: true,
  } as AppState,

  reducers: {
    setFirstTimeUser(state: AppState, flag: boolean) {
      return { ...state, firstTimeUser: flag }
    }
  },

  effects: (dispatch) => ({
    async fetchSomething(payload, rootState) {
      //
    }
  }),
});