import { createModel } from '@rematch/core';
import { RootModel } from '.';

export type AppState = {
  firstTimeUser: boolean;
  viewMode: string;
  arabicFontSize: number;
  arabicLatinFontSize: number;
  translationFontSize: number;
  showArabicLatin: boolean;
  darkMode: boolean;
};

export const app = createModel<RootModel>()({
  state: {
    firstTimeUser: true,
    viewMode: 'normal',
    arabicFontSize: 32,
    arabicLatinFontSize: 16,
    translationFontSize: 16,
    showArabicLatin: false,
    darkMode: false,
  } as AppState,

  reducers: {
    setFirstTimeUser(state: AppState, flag: boolean) {
      return { ...state, firstTimeUser: flag }
    },
    setViewMode(state: AppState, value: string) {
      return { ...state, viewMode: value }
    },
    setArabicFontSize(state: AppState, value: number) {
      return { ...state, arabicFontSize: value }
    },
    setArabicLatinFontSize(state: AppState, value: number) {
      return { ...state, arabicLatinFontSize: value }
    },
    setTranslationFontSize(state: AppState, value: number) {
      return { ...state, translationFontSize: value }
    },
    setShowArabicLatin(state: AppState, value: boolean) {
      return { ...state, showArabicLatin: value }
    },
    setDarkMode(state: AppState, value: boolean) {
      return { ...state, darkMode: value }
    }
  },

  effects: (dispatch) => ({
    async fetchSomething(payload, rootState) {
      //
    }
  }),
});