# Dhikr Notification Feature Implementation

## Overview

This implementation adds daily notification reminders for Dzikir Pagi (morning) and Dzikir Petang (evening) to the app. The notifications use a **cancel-and-reschedule pattern** that automatically removes notifications when the user completes their dhikr, preventing unnecessary reminders.

## Features

✅ **Master Toggle**: Complete control to enable/disable all notifications (disabled by default)  
✅ **Smart Notifications**: Only shows notification if user hasn't completed dhikr that day  
✅ **Customizable Times**: Users can set separate times for morning and evening notifications  
✅ **Individual Control**: Enable/disable pagi and petang notifications separately  
✅ **Automatic Rescheduling**: Notifications reschedule for next day after completion  
✅ **Persistent**: Survives app closure and device reboot  
✅ **Battery Efficient**: Uses native Android AlarmManager and iOS local notifications  
✅ **Streamlined UI**: Inline settings with single-line layout for easy configuration

## Architecture

### Files Added/Modified

#### New Files

1. **`src/services/notifications.ts`**

   - Core notification service with all notif
   - Time pickers for both pagi and petang
   - Toggle switches for enabling/disabling

#### Modified Files

1. **`src/App.tsx`**

   - Initialize notifications on app start
   - Handle foreground/background notification events

2. **`src/rematch/models/app.ts`**

   - Added notification state:
     - `enablePagiNotification`: boolean
     - `enablePetangNotification`: boolean
     - `pagiNotificationTime`: {hour, minute}
     - `petangNotificationTime`: {hour, minute}
   - Added reducers for updating notification settings
     Notifications`: boolean (master toggle, default: false)
     - `enablePagiNotification`: boolean (default: true)
     - `enablePetangNotification`: boolean (default: true)
     - `pagiNotificationTime`: {hour: 6, minute: 0}
     - `petangNotificationTime`: {hour: 16, minute: 0hikr completion
   - Auto-reschedule for next day after 60 seconds

3. **`src/screens/Setting/index.tsx`**
   inline notification settings in new Card component

   - Streamlined single-line layout: Switch - Text - Time badge
   - Header "Pengingat Dzikir" with inline master toggle
   - Uses `react-native-modal-datetime-picker` for time selectionnu item
   - Uses individual selectors (not object) to prevent useEffect dependency issues
   - Integrated notification settings modal
   - Handlers for toggling and updating notification times

4. **`android/app/src/main/AndroidManifest.xml`**

   - Added required Android permissions:
     - POST_NOTIFICATIONS (Android 13+)
     - SCHEDULE_EXACT_ALARM
     - USE_EXACT_ALARM
     - RECEIVE_BOOT_COMPLETED

5. **`ios/DzikirPagiPetang/Info.plist`**
   - Added background modes for notifications

## How It Works5:30 AM)\*\*

1. User completes dzikir → triggers `onDhikrCompleted()`
2. Cancels today's scheduled 6 AM notification
3. Reschedules for tomorrow 6 AM
4. Result: ✅ No notification shows at 6
5. User completes dzikir → triggers `onDhikrCompleted()`
6. Cancels today's scheduled 7 AM notification
7. Reschedules for tomorrow 7 AM
8. Result: ✅ No notification shows at 7 AM today
   6 AM arrives → notification triggers (wasn't cancelled)
9. Notification appears in tray
10. Result: ✅ User gets reminded

**Scenario 3: User completes dhikr after notification (e.g., 7 AM)**

1. User completes dzikir → triggers `onDhikrCompleted()`
2. Removes notification from notification tray
3. Reschedules for tomorrow 6 AM
4. Result: ✅ Notification disappears, next one scheduled

**Scenario 4: User forgets multiple days**

1. Day 1: No completion → notification shows at 6 AM
2. Day 2: No completion → notification shows at 6 AM (repeats)
3. Result: ✅ Keeps reminding every day until completed

**Scenario 5: Master toggle disabled (default)**

1. User hasn't enabled notifications in settings
2. Result: ✅ No notifications scheduled or shown
3. Day 1: No completion → notification shows at 7 AM
4. Day 2: No completion → notification shows at 7 AM (repeats)
5. Result: ✅ Keeps reminding every day until completed

### Key Functions

#### `scheduleDailyNotification(id, title, body, hour, minute)`

- Cancels any existing notification with same ID
- Schedules new notification at specified time
- If time already passed today, schedules for tomorrow
- Sets to repeat daily

#### `onDhikrCompleted(type, settings)`

- Called when user completes dhikr (after 60 seconds in dzikir screen)
- Checks master toggle (`enableNotifications`) first
- Requests notification permission
- Creates Android notification channel
- Schedules notifications based on individual enable flags
- Cancels all if master toggle is disabled

#### `initializeNotifications(settings)`

- Called on app startup
- Requests notification permission
- Creates Android notification channel
- CScrolls to "Pengingat Dzikir" card section

3. Inline settings available:
   - Header with master toggle (disabled by default)
   - Single-line row: Switch - "Dzikir Pagi" - Time badge (default: 06:00)
   - Single-line row: Switch - "Dzikir Petang" - Time badge (default: 16:00)
4. User can:
   - Enable/disable master toggle to control all notifications
   - Toggle individual pagi/petang notifications
   - Tap time badge to open time picker modal
5. Changes save automatically to Redux stor
6. Taps "Pengaturan Pengingat Dzikir"
7. Modal opens with:
   - Toggle for Dzikir Pagi reminder
   - Time picker for pagi (default: 07:00)
   - Toggle for Dzikir Petang reminder
   - Time picker for petang (default: 17:00)
8. User adjusts settings
9. Taps "Simpan" to save

### Notification Flow

1. User receives notification at scheduled time
2. User opens app from notification (optional)
3. User completes dhikr
4. After 60 seconds in dzikir screen:
   - Habit is recorded
   - Today's notification is cancelled
   - Tomorrow's notification is scheduled

## Permissions

### Android

- **POST_NOTIFICATIONS**: Required for Android 13+ to show notifications
- **SCHEDULE_EXACT_ALARM**: For precise timing
- **USE_EXACT_ALARM**: Alternative for exact alarms
- **RECEIVE_BOOT_COMPLETED**: Restore notifications after device restart
  Master Toggle (enableNotifications)\*\*: Disabled (false)
- **Pagi Notification**: Enabled, 06:00
- **Petang Notification**: Enabled, 16:00
- All settings can be customized in Settings screen
- Permissions handled automatically by iOS
- User prompted on first notification attempt

## Default Settings

- \*react-native-modal-datetime-picker": "^18.0.0"
  }

````

**Note**: Installed via `yarn add` (not npm)oth can be customized in settings

## Dependencies Added

```json
{
  "@notifee/react-native": "^9.1.8",
  "@react-native-community/datetimepicker": "^8.6.0"
}
````

## Testing Checklist

### Android

- [ ] Notification shows at scheduled time
- [ ] Notification cancels after dhikr completion
- [ ] Notification survives app closure
- [ ] Notification survives device reboot
- [ ] Time picker works correctly
- [ ] Permission request appears on Android 13+
- [ ] Notification sound plays
- [ ] Tapping notification opens app

### iOS

- [ ] Notification shows at scheduled time
- [ ] Notification cancels after dhikr completion
- [ ] Notification survives app closure
- [ ] Time picker works correctly
- [ ] Permission prompt appears
- [ ] Notification sound plays
- [ ] Tapping notification opens app

## Troubleshooting

### Notifications not showing

1. Check if notifications are enabled in app settings
2. Verify notification permission granted
3. Check scheduled notifications: Use `getAllScheduledNotifications()`
4. Android: Ensure battery optimization is disabled for app

### Notifications not canceling after completion

Known Issues & Fixes

### useEffect Dependency Bug (FIXED)

**Problem**: Using `notificationSettings` object as dependency caused timer to reset on every render.

**Solution**: Changed to individual selectors:

```typescript
const enableNotifications = useAppSelector(
  state => state.app.enableNotifications,
);
const enablePagiNotification = useAppSelector(
  state => state.app.enablePagiNotification,
);
// ... etc
```

This prevents object reference changes from triggering unnecessary re-renders.

## Future Enhancements

- [ ] Notification action buttons (e.g., "Mark as Done")
- [ ] Custom notification sounds
- [ ] Notification content templates
- [ ] Weekly notification summary
- [ ] Notification history
- [ ] Option to still show notification even after early completion

1. Verify DateTimePicker is properly installed
2. Run `npx pod-install` for iOS
3. Rebuild the app

## Future Enhancements

- [ ] Notification action buttons (e.g., "Mark as Done")
- [ ] Custom notification sounds
- [ ] Notification content templates
- [ ] Weekly notification summary
- [ ] Notification history

## Notes

- Notifications use native schedulers (reliable, battery-efficient)
- No background services required
- State persisted in Redux store via AsyncStorage
- Compatible with both old and new React Native architectures
