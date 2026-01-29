/**
 * Notifications Module (Stub)
 *
 * Placeholder for notification functionality.
 * Uses AsyncStorage only - no native notification dependency.
 * Add expo-notifications later when ready to enable push notifications.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@daisy_notification_settings';

export async function requestPermissions() {
  // Stub - notifications not yet enabled
  return false;
}

export async function scheduleDailyCheckin(options = {}) {
  await saveNotificationSetting('dailyCheckin', { enabled: true, ...options });
  return null;
}

export async function scheduleEveningReflection(options = {}) {
  await saveNotificationSetting('eveningReflection', { enabled: true, ...options });
  return null;
}

export async function scheduleCustomReminder(options) {
  return null;
}

export async function sendImmediateNotification(title, body, data = {}) {
  return null;
}

export async function cancelNotificationsByIdentifier(identifier) {
  // No-op
}

export async function cancelAllNotifications() {
  await AsyncStorage.removeItem(STORAGE_KEY);
}

export async function getScheduledNotifications() {
  return [];
}

async function saveNotificationSetting(key, value) {
  try {
    const settingsJson = await AsyncStorage.getItem(STORAGE_KEY);
    const settings = settingsJson ? JSON.parse(settingsJson) : {};
    settings[key] = value;
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error('Error saving notification setting:', error);
  }
}

export async function getNotificationSettings() {
  try {
    const settingsJson = await AsyncStorage.getItem(STORAGE_KEY);
    return settingsJson ? JSON.parse(settingsJson) : {};
  } catch (error) {
    console.error('Error getting notification settings:', error);
    return {};
  }
}

export async function setupDefaultNotifications() {
  await saveNotificationSetting('dailyCheckin', { enabled: true, hour: 9, minute: 0 });
  await saveNotificationSetting('eveningReflection', { enabled: true, hour: 20, minute: 0 });
  return true;
}

export function addNotificationResponseListener(callback) {
  return { remove: () => {} };
}

export function addNotificationReceivedListener(callback) {
  return { remove: () => {} };
}

export default {
  requestPermissions,
  scheduleDailyCheckin,
  scheduleEveningReflection,
  scheduleCustomReminder,
  sendImmediateNotification,
  cancelNotificationsByIdentifier,
  cancelAllNotifications,
  getScheduledNotifications,
  getNotificationSettings,
  setupDefaultNotifications,
  addNotificationResponseListener,
  addNotificationReceivedListener,
};
