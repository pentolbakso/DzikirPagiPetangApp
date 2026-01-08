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
  darkMode: boolean | undefined;
  showCounter: boolean;
  enableVibrate: boolean;
  themeColor: string | undefined;
  enableTracker: boolean;
  habitHistory: Record<string, HabitDay>;
  enableNotifications: boolean;
  enablePagiNotification: boolean;
  enablePetangNotification: boolean;
  pagiNotificationTime: {hour: number; minute: number};
  petangNotificationTime: {hour: number; minute: number};
};

export const app = createModel<RootModel>()({
  state: {
    firstTimeUser: true,
    viewMode: 'normal',
    arabicFontSize: 32,
    arabicLatinFontSize: 16,
    translationFontSize: 16,
    showArabicLatin: false,
    darkMode: undefined,
    showCounter: false,
    enableVibrate: false,
    themeColor: undefined,
    enableTracker: true,
    habitHistory: {},
    enableNotifications: false,
    enablePagiNotification: true,
    enablePetangNotification: true,
    pagiNotificationTime: {hour: 6, minute: 0},
    petangNotificationTime: {hour: 16, minute: 0},
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
    setEnableNotifications(state: AppState, value: boolean) {
      return {...state, enableNotifications: value};
    },
    setEnablePagiNotification(state: AppState, value: boolean) {
      return {...state, enablePagiNotification: value};
    },
    setEnablePetangNotification(state: AppState, value: boolean) {
      return {...state, enablePetangNotification: value};
    },
    setPagiNotificationTime(
      state: AppState,
      value: {hour: number; minute: number},
    ) {
      return {...state, pagiNotificationTime: value};
    },
    setPetangNotificationTime(
      state: AppState,
      value: {hour: number; minute: number},
    ) {
      return {...state, petangNotificationTime: value};
    },
  },

  effects: dispatch => ({
    async fetchSomething(payload, rootState) {
      //
    },
  }),
});
