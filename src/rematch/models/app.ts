import {createModel} from '@rematch/core';
import {RootModel} from '.';

export type HabitDay = {
  pagi: boolean;
  petang: boolean;
};

export type AppState = {
  firstTimeUser: boolean;
  viewMode: string;
  arabicFontSize: number;
  arabicLatinFontSize: number;
  translationFontSize: number;
  showArabicLatin: boolean;
  darkMode: boolean;
  showCounter: boolean;
  enableVibrate: boolean;
  themeColor: string | undefined;
  enableTracker: boolean;
  habitHistory: Record<string, HabitDay>;
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
    showCounter: false,
    enableVibrate: false,
    themeColor: undefined,
    enableTracker: true,
    habitHistory: {},
  } as AppState,

  reducers: {
    setFirstTimeUser(state: AppState, flag: boolean) {
      return {...state, firstTimeUser: flag};
    },
    setViewMode(state: AppState, value: string) {
      return {...state, viewMode: value};
    },
    setArabicFontSize(state: AppState, value: number) {
      return {...state, arabicFontSize: value};
    },
    setArabicLatinFontSize(state: AppState, value: number) {
      return {...state, arabicLatinFontSize: value};
    },
    setTranslationFontSize(state: AppState, value: number) {
      return {...state, translationFontSize: value};
    },
    setShowArabicLatin(state: AppState, value: boolean) {
      return {...state, showArabicLatin: value};
    },
    setDarkMode(state: AppState, value: boolean) {
      return {...state, darkMode: value};
    },
    setShowCounter(state: AppState, value: boolean) {
      return {...state, showCounter: value};
    },
    setEnableVibrate(state: AppState, value: boolean) {
      return {...state, enableVibrate: value};
    },
    setThemeColor(state: AppState, value: string | undefined) {
      return {...state, themeColor: value};
    },
    setEnableTracker(state: AppState, value: boolean) {
      return {...state, enableTracker: value};
    },
    recordHabit(
      state: AppState,
      payload: {date: string; time: 'pagi' | 'petang'},
    ) {
      const {date, time} = payload;
      const dayData = (state.habitHistory || {})[date] || {
        pagi: false,
        petang: false,
      };
      return {
        ...state,
        habitHistory: {
          ...(state.habitHistory || {}),
          [date]: {...dayData, [time]: true},
        },
      };
    },
  },

  effects: dispatch => ({
    async fetchSomething(payload, rootState) {
      //
    },
  }),
});
