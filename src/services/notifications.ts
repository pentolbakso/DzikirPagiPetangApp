import notifee, {
  RepeatFrequency,
  TriggerType,
  AndroidImportance,
} from '@notifee/react-native';
import {Platform} from 'react-native';

const CHANNEL_ID = 'dhikr-reminders';
const PAGI_NOTIFICATION_ID = 'dhikr-pagi-reminder';
const PETANG_NOTIFICATION_ID = 'dhikr-petang-reminder';

const MOTIVATIONAL_PHRASES = [
  'untuk menenangkan hati.',
  'agar hati tetap hidup.',
  'supaya jiwa lebih tenang.',
  'sebagai pengingat kepada Allah.',
  'karena zikir menenangkan.',
  'agar hati tidak goyah.',
  'supaya iman tetap terjaga.',
  'sebagai penjaga ketenangan.',
  'agar pikiran lebih jernih.',
  'karena hati perlu diingatkan.',
  'supaya jiwa tidak gelisah.',
  'sebagai penguat hati.',
  'agar langkah lebih ringan.',
  'karena zikir menguatkan.',
  'supaya hati tetap lembut.',
  'sebagai tempat kembali.',
  'agar rasa cemas mereda.',
  'karena zikir menenangkan jiwa.',
  'supaya hati lebih kuat.',
  'sebagai penenang batin.',
  'agar iman tidak lalai.',
  'karena mengingat Allah menenangkan.',
  'supaya hidup lebih terarah.',
  'sebagai pengingat diri.',
  'agar hati tetap fokus.',
  'karena zikir adalah cahaya.',
  'supaya jiwa lebih damai.',
  'sebagai penjaga hati.',
  'agar hati tidak resah.',
  'karena ketenangan berasal dari zikir.',
];

function getRandomPhrase(): string {
  const randomIndex = Math.floor(Math.random() * MOTIVATIONAL_PHRASES.length);
  return MOTIVATIONAL_PHRASES[randomIndex];
}

/**
 * Create notification channel for Android
 */
export async function createNotificationChannel() {
  if (Platform.OS === 'android') {
    await notifee.createChannel({
      id: CHANNEL_ID,
      name: 'Pengingat Dzikir',
      importance: AndroidImportance.HIGH,
      sound: 'default',
    });
  }
}

/**
 * Check current notification permission status
 */
export async function checkNotificationPermission(): Promise<boolean> {
  const settings = await notifee.getNotificationSettings();
  return (
    settings.authorizationStatus === 1 || // AUTHORIZED (iOS)
    settings.authorizationStatus === 2 // PROVISIONAL (iOS)
  );
}

/**
 * Request notification permission
 */
export async function requestNotificationPermission(): Promise<boolean> {
  const settings = await notifee.requestPermission();
  return (
    settings.authorizationStatus === 1 || // AUTHORIZED
    settings.authorizationStatus === 2 // PROVISIONAL
  );
}

/**
 * Schedule daily notification at specific time
 */
export async function scheduleDailyNotification(
  notificationId: string,
  title: string,
  body: string,
  hour: number,
  minute: number,
): Promise<void> {
  // Cancel existing notification first
  await notifee.cancelTriggerNotification(notificationId);

  const date = new Date();
  date.setHours(hour, minute, 0, 0);

  // If time already passed today, schedule for tomorrow
  if (date <= new Date()) {
    date.setDate(date.getDate() + 1);
  }

  const trigger: any = {
    type: TriggerType.TIMESTAMP,
    timestamp: date.getTime(),
    repeatFrequency: RepeatFrequency.DAILY,
  };

  await notifee.createTriggerNotification(
    {
      id: notificationId,
      title,
      body,
      android: {
        channelId: CHANNEL_ID,
        pressAction: {id: 'default'},
        autoCancel: true,
      },
      ios: {
        categoryId: 'dhikr-reminder',
      },
    },
    trigger,
  );

  console.log(
    `Scheduled notification "${title}" for ${hour}:${minute
      .toString()
      .padStart(2, '0')}`,
  );
}

/**
 * Schedule Pagi (morning) dhikr notification
 */
export async function schedulePagiNotification(
  hour: number = 7,
  minute: number = 0,
): Promise<void> {
  const randomPhrase = getRandomPhrase();
  await scheduleDailyNotification(
    PAGI_NOTIFICATION_ID,
    'Waktunya Dzikir Pagi',
    `Jangan lupa baca dzikir pagi hari ini 🤲 ${randomPhrase}`,
    hour,
    minute,
  );
}
/**
 * Schedule Petang (evening) dhikr notification
 */
export async function schedulePetangNotification(
  hour: number = 17,
  minute: number = 0,
): Promise<void> {
  const randomPhrase = getRandomPhrase();
  await scheduleDailyNotification(
    PETANG_NOTIFICATION_ID,
    'Waktunya Dzikir Petang',
    `Jangan lupa baca dzikir petang hari ini 🤲 ${randomPhrase}`,
    hour,
    minute,
  );
}

/**
 * Cancel notification for specific dhikr type
 */
export async function cancelNotification(
  type: 'pagi' | 'petang',
): Promise<void> {
  const notificationId =
    type === 'pagi' ? PAGI_NOTIFICATION_ID : PETANG_NOTIFICATION_ID;

  // Cancel scheduled notification
  await notifee.cancelTriggerNotification(notificationId);

  // Also remove from notification tray if currently showing
  await notifee.cancelDisplayedNotification(notificationId);

  console.log(`Cancelled ${type} notification`);
}

/**
 * Cancel all dhikr notifications
 */
export async function cancelAllNotifications(): Promise<void> {
  await notifee.cancelTriggerNotification(PAGI_NOTIFICATION_ID);
  await notifee.cancelTriggerNotification(PETANG_NOTIFICATION_ID);
  await notifee.cancelDisplayedNotification(PAGI_NOTIFICATION_ID);
  await notifee.cancelDisplayedNotification(PETANG_NOTIFICATION_ID);
  console.log('Cancelled all notifications');
}

/**
 * Handle dhikr completion - cancel and reschedule notification
 */
export async function onDhikrCompleted(
  type: 'pagi' | 'petang',
  settings: {
    enableNotification: boolean;
    hour: number;
    minute: number;
  },
): Promise<void> {
  // Cancel today's notification
  await cancelNotification(type);

  // Reschedule for tomorrow if enabled
  if (settings.enableNotification) {
    if (type === 'pagi') {
      await schedulePagiNotification(settings.hour, settings.minute);
    } else {
      await schedulePetangNotification(settings.hour, settings.minute);
    }
  }

  console.log(`Dhikr ${type} completed - rescheduled for tomorrow`);
}

/**
 * Check if notification is scheduled
 */
export async function isNotificationScheduled(
  type: 'pagi' | 'petang',
): Promise<boolean> {
  const notificationId =
    type === 'pagi' ? PAGI_NOTIFICATION_ID : PETANG_NOTIFICATION_ID;
  const triggers = await notifee.getTriggerNotifications();
  return triggers.some(t => t.notification.id === notificationId);
}

/**
 * Get all scheduled notifications
 */
export async function getAllScheduledNotifications() {
  return await notifee.getTriggerNotifications();
}

/**
 * Initialize notifications on app start
 */
export async function initializeNotifications(settings: {
  enableNotifications: boolean;
  enablePagiNotification: boolean;
  enablePetangNotification: boolean;
  pagiNotificationTime: {hour: number; minute: number};
  petangNotificationTime: {hour: number; minute: number};
}): Promise<void> {
  // Check if notifications are globally enabled
  if (!settings.enableNotifications) {
    console.log('Notifications disabled by user');
    await cancelAllNotifications();
    return;
  }

  // Request permission
  const hasPermission = await requestNotificationPermission();
  if (!hasPermission) {
    console.log('Notification permission denied');
    return;
  }

  // Create channel for Android
  await createNotificationChannel();

  // Schedule notifications if enabled and not already scheduled
  const triggers = await notifee.getTriggerNotifications();

  if (settings.enablePagiNotification) {
    const isPagiScheduled = triggers.some(
      t => t.notification.id === PAGI_NOTIFICATION_ID,
    );
    if (!isPagiScheduled) {
      await schedulePagiNotification(
        settings.pagiNotificationTime.hour,
        settings.pagiNotificationTime.minute,
      );
    }
  }

  if (settings.enablePetangNotification) {
    const isPetangScheduled = triggers.some(
      t => t.notification.id === PETANG_NOTIFICATION_ID,
    );
    if (!isPetangScheduled) {
      await schedulePetangNotification(
        settings.petangNotificationTime.hour,
        settings.petangNotificationTime.minute,
      );
    }
  }

  console.log('Notifications initialized');
}
