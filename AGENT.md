# AGENT.md - Project Context for AI

## Project Overview

**Dzikir Pagi Petang** - React Native mobile app for Islamic morning/evening dzikir (remembrance prayers)  
**Platform:** iOS & Android | **Language:** TypeScript | **Node:** >=20

---

## Core Tech Stack

**Framework:** React Native 0.81.5, React 19.1.0, TypeScript 5.8.3  
**Navigation:** @react-navigation/native + stack  
**State:** @rematch/core + @rematch/persist (AsyncStorage)  
**UI:** react-native-paper (Material Design 3), Linear Gradient, PagerView  
**Utilities:** dayjs, react-native-rate, react-native-modal-datetime-picker  
**Notifications:** @notifee/react-native (Android), @react-native-community/push-notification-ios (iOS)

---

## Project Structure

```
src/
├── App.tsx                          # Root component
├── components/                      # Card, Text, HabitTracker
├── navigator/                       # Navigation config
├── rematch/
│   ├── store.ts                     # Redux store with persistence
│   └── models/app.ts                # App state model
├── screens/
│   ├── Home/                        # Landing screen
│   ├── Dzikir/                      # Main dzikir reader (ContentV2, Notes)
│   └── Setting/                     # App settings
├── services/
│   ├── db.ts                        # Dzikir database (hardcoded)
│   └── notifications.ts             # Notification scheduling
└── theme/                           # useAppTheme hook + theme definitions
```

---

## Key Data Types

### Dzikir Structure

```typescript
type Dzikir = {
  id: number;
  title: string;
  arabic: string; // Use | as line separator
  arabic_latin: string; // Transliteration
  translated_id: string; // Indonesian translation
  faedah: string; // Benefits/virtues
  note: string; // Usage notes (e.g., "3x")
  time: 'pagi' | 'petang' | ''; // Morning/Evening/Both
  from_quran?: boolean;
  is_surah?: boolean;
  max_counter?: number; // Repetition count
};
```

### App State (Redux)

```typescript
type AppState = {
  firstTimeUser: boolean;
  viewMode: string;
  // Font sizes
  arabicFontSize: number; // Default: 32
  arabicLatinFontSize: number; // Default: 16
  translationFontSize: number; // Default: 16
  showArabicLatin: boolean;
  // UI preferences
  darkMode: boolean | undefined; // undefined = system default
  showCounter: boolean;
  enableVibrate: boolean;
  themeColor: string | undefined;
  // Habit tracking
  enableTracker: boolean; // Default: true
  habitHistory: Record<string, {pagi: boolean; petang: boolean}>;
  // Notifications (NEW)
  enableNotifications: boolean;
  enablePagiNotification: boolean;
  enablePetangNotification: boolean;
  pagiNotificationTime: {hour: number; minute: number}; // Default: 6:00
  petangNotificationTime: {hour: number; minute: number}; // Default: 16:00
};
```

**Storage:** Persisted via Redux Persist + AsyncStorage

---

## Features

### 1. Dzikir Content

- Database: Hardcoded in `services/db.ts`
- Content: Ayat Kursi, Surah Al-Ikhlas/Al-Falaq/An-Nas, morning/evening-specific dzikir

### 2. Reading Interface

- PagerView for swipeable content
- Counter with circular progress indicator
- Vibration feedback on tap
- Adjustable font sizes (Arabic, Latin, Translation)
- Notes/faedah accessible via drawer

### 3. Habit Tracker

- Records daily completion (pagi/petang)
- 30-day visualization
- Optional feature (can be disabled)

### 4. Notifications

- Daily reminders for morning/evening dzikir
- Configurable times (default: 6:00 AM, 4:00 PM)
- Individual toggle for pagi/petang
- Uses Notifee (Android) and PushNotificationIOS (iOS)

### 5. Theming

- Material Design 3
- Dark/Light mode (system default or manual)
- Adaptive navigation theme

---

## Navigation Structure

```
Stack Navigator:
- Home         → Landing with pagi/petang options
- Dzikir       → Reader (gestures disabled)
- Setting      → App preferences
```

---

## Common Development Tasks

### Add New Dzikir

1. Edit `src/services/db.ts` → add to `dzikirDb` array
2. Use `|` for line breaks in `arabic`, `arabic_latin`, `translated_id`
3. Set `time: 'pagi' | 'petang' | ''`

### Add App Setting

1. Update `AppState` in `src/rematch/models/app.ts`
2. Add reducer (e.g., `setNewSetting`)
3. Add UI controls in `src/screens/Setting/index.tsx`
4. Auto-persists via Redux Persist

### Modify Theme

- Hook: `useAppTheme()` returns `{theme, navigationTheme}`
- Access colors: `theme.colors.primary`, `theme.colors.background`, etc.
- Custom themes: `src/theme/themes/`

### Update Notifications

- Service: `src/services/notifications.ts`
- Functions: `schedulePagiNotification()`, `schedulePetangNotification()`, `cancelNotification()`
- Always request permissions before scheduling

---

## Redux Patterns

```typescript
// Read state
const dispatch = useDispatch<Dispatch>();
const darkMode = useSelector((state: RootState) => state.app.darkMode);

// Update state
dispatch.app.setDarkMode(true);
dispatch.app.setArabicFontSize(36);
dispatch.app.recordHabit({date: '2026-01-29', time: 'pagi'});
```

**⚠️ Migration Safety:** When adding new state fields, always provide default values in selectors:

```typescript
const pagiTime = useSelector(
  (state: RootState) => state.app.pagiNotificationTime || {hour: 6, minute: 0},
);
```

---

## Important Conventions

1. **Arabic Text:** Always use `|` as line separator in Arabic, Latin, and translation fields
2. **Type Safety:** Maintain strict TypeScript types for `Dzikir` and `AppState`
3. **State Persistence:** All `app` state changes auto-save to AsyncStorage
4. **Theme Hook:** Use `useAppTheme()` for all styling (not `useTheme()` from navigation)
5. **Gestures:** Disabled on Dzikir screen to prevent accidental exits
6. **Platform Code:** Avoid platform-specific (iOS/Android) code suggestions unless critical
7. **Testing:** Always test on both platforms due to native differences
8. **Undefined Safety:** Always check for undefined values — use optional chaining (`?.`) and nullish coalescing (`??`) or provide defaults for safety.

Examples:

```typescript
// selector with default
const pagiTime = useSelector(
  (s: RootState) => s.app.pagiNotificationTime ?? {hour: 6, minute: 0},
);

// safe access
const hour = state.app.pagiNotificationTime?.hour ?? 6;
```

---

## Quick Reference

```bash
# Development
npm run android / npm run ios
npm start

# Clean builds
cd android && ./gradlew clean
cd ios && rm -rf Pods && pod install

# Reset Metro
npm start -- --reset-cache

# Debugging
npx react-native log-android
npx react-native log-ios
```

---

**Last Updated:** January 2026
