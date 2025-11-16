# AGENT.md - Project Context for LLM

## Project Overview

**Project Name:** Dzikir Pagi Petang  
**Platform:** React Native Mobile Application (iOS & Android)  
**Language:** TypeScript  
**Purpose:** Islamic mobile application for morning and evening dzikir (remembrance prayers) based on the sunnah, with references from the book by Ustadz Yazid rahimahullah.

---

## Tech Stack

### Core Framework

- **React Native:** 0.81.5 (upgrading to 0.82)
- **React:** 19.1.0
- **TypeScript:** 5.8.3
- **Node:** >=20

### Navigation & UI

- **@react-navigation/native:** 7.1.19
- **@react-navigation/stack:** 7.6.1
- **react-native-paper:** 5.14.5 (Material Design 3)
- **react-native-safe-area-context:** 5.6.2
- **react-native-screens:** 4.18.0

### State Management

- **@rematch/core:** 2.2.0
- **@rematch/loading:** 2.1.2
- **@rematch/persist:** 2.1.2
- **react-redux:** 9.2.0
- **redux:** 5.0.1
- **@react-native-async-storage/async-storage:** 2.2.0

### UI Components & Styling

- **react-native-linear-gradient:** 2.8.3
- **react-native-svg:** 15.14.0
- **@material/material-color-utilities:** 0.3.0
- **color:** 5.0.2
- **react-native-gesture-handler:** 2.29.0
- **react-native-reanimated:** 4.1.3
- **react-native-worklets:** 0.5.2

### Interactive Components

- **react-native-pager-view:** 6.9.1
- **react-native-circular-progress-indicator:** 4.4.2
- **react-native-progress:** 5.0.1
- **@react-native-community/slider:** 5.1.0
- **@gorhom/bottom-sheet:** ^5
- **react-native-side-drawer:** 2.1.0

### Icons

- **@react-native-vector-icons/feather:** 12.4.0
- **@react-native-vector-icons/material-design-icons:** 12.4.0

### Utilities

- **dayjs:** 1.11.19
- **react-native-rate:** 1.2.12

### Development Tools

- **@babel/core:** 7.25.2
- **@react-native/metro-config:** 0.81.5
- **@react-native/eslint-config:** 0.81.5
- **jest:** 29.6.3
- **prettier:** 2.8.8

---

## Project Structure

```
DzikirPagiPetang/
├── src/
│   ├── App.tsx                      # Root component
│   ├── Loader.tsx                   # Loading component
│   ├── colors.ts                    # Color definitions
│   ├── types.ts                     # TypeScript type definitions
│   ├── assets/
│   │   └── fonts/                   # Custom fonts (Arabic)
│   ├── components/
│   │   ├── Card.tsx                 # Reusable card component
│   │   └── Text.tsx                 # Custom text components (TextBold, TextRegular)
│   ├── navigator/
│   │   └── index.tsx                # Navigation configuration
│   ├── rematch/
│   │   ├── store.ts                 # Redux store setup with Rematch
│   │   └── models/
│   │       ├── index.ts             # Model aggregation
│   │       └── app.ts               # App state model
│   ├── screens/
│   │   ├── Home/
│   │   │   └── index.tsx            # Home screen
│   │   ├── Dzikir/
│   │   │   ├── index.tsx            # Main dzikir screen
│   │   │   ├── ContentV2.tsx        # Dzikir content display
│   │   │   └── Notes.tsx            # Notes/faedah display
│   │   ├── Setting/
│   │   │   └── index.tsx            # Settings screen
│   │   └── Palette/
│   │       └── index.tsx            # Theme color palette screen
│   ├── services/
│   │   └── db.ts                    # Dzikir database (hardcoded)
│   └── theme/
│       ├── useAppTheme.ts           # Theme hook
│       └── themes/                  # Theme definitions
├── android/                          # Android native project
├── ios/                              # iOS native project
├── __tests__/                        # Test files
└── Config files                      # babel, jest, metro, tsconfig, etc.
```

---

## Key Features & Functionality

### 1. **Dzikir Content**

- **Database:** Hardcoded dzikir data in `src/services/db.ts`
- **Content Types:**
  - Ayat Kursi
  - Surah Al-Ikhlas, Al-Falaq, An-Nas (3x each)
  - Morning-specific dzikir (time: 'pagi')
  - Evening-specific dzikir (time: 'petang')
  - General dzikir (no time specification)

### 2. **Data Structure (Dzikir Type)**

```typescript
type Dzikir = {
  id: number;
  arabic: string; // Arabic text with | as line separator
  arabic_latin: string; // Transliteration
  faedah: string; // Benefits/virtues
  note: string; // Usage notes (e.g., "Dibaca 3x")
  title: string; // Title
  translated_id: string; // Indonesian translation
  time: string; // 'pagi', 'petang', or ''
  from_quran?: boolean; // Is from Quran
  is_surah?: boolean; // Is a complete surah
  max_counter?: number; // Repetition count
};
```

### 3. **State Management (Rematch/Redux)**

**App State:**

```typescript
type AppState = {
  firstTimeUser: boolean;
  viewMode: string; // 'normal' mode
  arabicFontSize: number; // Default: 32
  arabicLatinFontSize: number; // Default: 16
  translationFontSize: number; // Default: 16
  showArabicLatin: boolean; // Show transliteration
  darkMode: boolean; // Dark/light theme
  showCounter: boolean; // Display counter
  enableVibrate: boolean; // Haptic feedback
  themeColor: string | undefined; // Custom theme color
};
```

**Persistence:** Uses Redux Persist with AsyncStorage, whitelist: ['app']

### 4. **Navigation Structure**

- **Stack Navigator:**
  - `Home` - Main landing screen
  - `Dzikir` - Dzikir reading screen (gesture disabled)
  - `Setting` - Settings screen (header shown)
  - `Palettes` - Theme color selection (header shown)

### 5. **UI Components**

- **PagerView:** For swipeable dzikir content
- **MenuDrawer:** Right-side drawer (100% width)
- **CircularProgress:** Counter visualization
- **SwitchModeButton:** Mode switching UI
- Vibration feedback on interactions
- Custom fonts for Arabic text

### 6. **Theming System**

- Material Design 3 (MD3) with react-native-paper
- Dark/Light mode support
- Custom theme colors using Material Color Utilities
- Adaptive navigation theme
- Theme persistence in Redux

---

## Screen Responsibilities

### Home Screen

- Landing page with navigation to dzikir sessions
- Likely shows morning/evening options

### Dzikir Screen

- Main reading interface with PagerView
- Progress tracking with circular indicator
- Counter functionality
- Notes/faedah display via drawer
- Multiple view modes
- Font size controls
- Vibration feedback support

### Setting Screen

- Font size adjustments (Arabic, Latin, Translation)
- Toggle Arabic transliteration
- Dark mode toggle
- Counter display toggle
- Vibration toggle
- Theme color selection

### Palette Screen

- Theme color picker
- Preview of color schemes

---

## Development Workflow

### Available Scripts

```bash
npm run android      # Run on Android
npm run ios          # Run on iOS
npm run start        # Start Metro bundler
npm run lint         # Run ESLint
npm run test         # Run Jest tests
```

### Platform-Specific

- **iOS:** Swift-based, uses CocoaPods
- **Android:** Gradle-based build system
- **Asset Linking:** Custom fonts linked via `react-native-config.js`

---

## Important Patterns & Conventions

### 1. **Text Formatting**

- Arabic text uses pipe (`|`) as line separator
- Custom Text components (TextBold, TextRegular) for consistent styling
- Font sizes configurable per text type

### 2. **Component Patterns**

- Functional components with hooks
- Redux state via `useSelector` hook
- Memoization with `React.useMemo` and `React.useCallback`
- TypeScript for type safety

### 3. **State Updates**

```typescript
const dispatch = useDispatch<Dispatch>();
dispatch.app.setDarkMode(true);
dispatch.app.setArabicFontSize(36);
```

### 4. **Theme Usage**

```typescript
const {theme, navigationTheme} = useAppTheme();
const {colors} = theme;
```

---

## Key Dependencies to Note

### Animation & Gestures

- **react-native-reanimated:** For complex animations
- **react-native-gesture-handler:** Touch gesture handling
- **react-native-worklets:** JavaScript worklets for animations

### Material Design

- Uses MD3 theming from react-native-paper
- Material color utilities for dynamic color schemes

### Data Persistence

- AsyncStorage for app state
- Redux Persist with transforms for state hydration

---

## Build Configuration

### TypeScript

- Extends `@react-native/typescript-config`
- Includes all `.ts` and `.tsx` files
- Excludes `node_modules` and `Pods`

### Babel

- React Native preset
- Custom babel config in `babel.config.js`

### Metro

- Custom metro config in `metro.config.js`

---

## Platform-Specific Files

### iOS

- **App Delegate:** Swift-based (`AppDelegate.swift`)
- **Info.plist:** App configuration
- **LaunchScreen.storyboard:** Launch screen
- **PrivacyInfo.xcprivacy:** Privacy manifest
- **Podfile:** CocoaPods dependencies

### Android

- **build.gradle:** Build configuration (app & project level)
- **gradle.properties:** Gradle settings
- **proguard-rules.pro:** Code obfuscation rules

---

## Git Context

- **Repo:** DzikirPagiPetangApp (pentolbakso)
- **Current Branch:** upgrade-rn0.82
- Likely upgrading from previous RN version to 0.82

---

## Common Development Tasks

### Adding New Dzikir

1. Add entry to `dzikirDb` array in `src/services/db.ts`
2. Follow the `Dzikir` type structure
3. Use `|` for line breaks in Arabic/Latin/Translation

### Modifying App Settings

1. Update `AppState` type in `src/rematch/models/app.ts`
2. Add reducer for new setting
3. Create UI controls in Setting screen
4. State persists automatically via Redux Persist

### Changing Theme

1. Modify theme definitions in `src/theme/themes/`
2. Theme hook: `useAppTheme()`
3. Colors accessible via `theme.colors`

### Adding Navigation Routes

1. Update `src/navigator/index.tsx`
2. Add screen component in `src/screens/`
3. Configure stack screen options

---

## Known Patterns

### Animated Components

```typescript
const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);
```

### Drawer Pattern

```typescript
<MenuDrawer
  open={isOpen}
  drawerContent={<DrawerContent />}
  drawerPercentage={100}
  position="right">
  {children}
</MenuDrawer>
```

### Redux Dispatch

```typescript
const dispatch = useDispatch<Dispatch>();
dispatch.app.setViewMode('compact');
```

---

## API References & Resources

- Islamic content based on book by Ustadz Yazid rahimahullah
- Hadith references included in `faedah` field
- HR (Hadith Riwayat) citations for authenticity

---

## Future Considerations

- Currently upgrading to React Native 0.82
- Potential for backend integration (currently hardcoded data)
- Possible features: audio recitation, bookmarks, custom dzikir lists
- Analytics for tracking dzikir completion

---

## Quick Reference Commands

```bash
# iOS Development
cd ios && pod install && cd ..
npm run ios

# Android Development
npm run android

# Clean builds
cd android && ./gradlew clean && cd ..
cd ios && rm -rf Pods && pod install && cd ..

# Reset Metro cache
npm start -- --reset-cache
```

---

## Important Notes for AI Agents

1. **Arabic Text Handling:** Always preserve pipe (`|`) separators in Arabic, Latin, and translation fields
2. **Type Safety:** Maintain strict TypeScript types, especially for `Dzikir` and `AppState`
3. **State Persistence:** Changes to app state automatically persist via Redux Persist
4. **Theme Consistency:** Use `useAppTheme()` hook for all theme-related styling
5. **Navigation:** Gestures disabled on Dzikir screen to prevent accidental exits
6. **Font Sizes:** Three separate font size controls (Arabic, Latin, Translation)
7. **Vibration:** Platform-specific vibration patterns available via `Vibration` API
8. **Testing:** Always test on both iOS and Android due to platform differences

---

**Last Updated:** November 16, 2025  
**Version:** 0.0.1  
**React Native:** 0.81.5 (upgrading to 0.82)
