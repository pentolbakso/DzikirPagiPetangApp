import { init, RematchDispatch, RematchRootState } from '@rematch/core';
import loading, { ExtraModelsFromLoading } from '@rematch/loading';
import persist from '@rematch/persist';
import AsyncStorage from '@react-native-community/async-storage';
import { models, RootModel } from './models';
import { createTransform } from 'redux-persist';

const appTransformer = createTransform(
  // transform state on its way to being serialized and persisted.
  (inboundState, key) => {
    // console.log('in', inboundState);
    return { ...inboundState as {} };
  },
  // transform state being rehydrated
  (outboundState, key) => {
    // console.log('rehydrated', outboundState);
    return {
      ...outboundState,
      // session: null, // for testing, reset every startup
    };
  },
  { whitelist: ['app'] },
);


type FullModel = ExtraModelsFromLoading<RootModel>;
export const store = init<RootModel, FullModel>({
  models,
  plugins: [
    loading(),  // must above the updated() plugin, or the state will undefined
    persist({
      key: 'root',
      storage: AsyncStorage,
      version: 1,
      whitelist: ['app'],
      transforms: [appTransformer],
    })
  ],
});

export type Store = typeof store;
export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel, FullModel>;