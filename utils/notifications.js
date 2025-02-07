import * as Notifications from 'expo-notifications';
import { useState, useEffect } from 'react';

// Configure notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

// Schedule a daily notification
export const scheduleNotification = async () => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Time to Reflect!',
      body: 'Take a moment to log your mood or write in your journal.',
      badge: 1, // Set badge count
    },
    trigger: { seconds: 3600 }, // Repeat every hour
  });
};

// Register for push notifications
export const registerForPushNotifications = async () => {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') {
    alert('Permission for notifications was denied.');
    return;
  }
};

// Custom hook to manage notifications
export const useNotifications = () => {
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    // Listen for incoming notifications
    const subscription = Notifications.addNotificationReceivedListener((notification) => {
      setNotificationCount((prev) => prev + 1);
    });

    // Clear the notification count when the app is opened
    const foregroundSubscription = Notifications.addNotificationResponseReceivedListener(() => {
      setNotificationCount(0);
    });

    return () => {
      subscription.remove();
      foregroundSubscription.remove();
    };
  }, []);

  return { notificationCount };
};