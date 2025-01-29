import * as Notifications from 'expo-notifications';

export const scheduleNotification = async () => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Time to Reflect!',
      body: 'Take a moment to log your mood or write in your journal.',
    },
    trigger: { seconds: 3600 }, // Repeat every hour
  });
};

export const registerForPushNotifications = async () => {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') {
    alert('Permission for notifications was denied.');
    return;
  }
};