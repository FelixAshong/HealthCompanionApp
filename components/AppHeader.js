import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Icon library
import * as Notifications from 'expo-notifications'; // Expo Notifications package
import * as Permissions from 'expo-permissions'; // Permissions package
import { useNotifications } from '../utils/notifications'; // Custom hook for notification count

export default function AppHeader({ navigation }) {
  const { notificationCount } = useNotifications(); // Get the current notification count

  // Function to register for push notifications
  const registerForPushNotifications = async () => {
    try {
      // Ask for notification permissions
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      if (status !== 'granted') {
        console.log('Notification permissions not granted');
        return;
      }

      // Get the push token for the device
      const token = await Notifications.getExpoPushTokenAsync();
      console.log('Push notification token:', token);
      // You can use this token to send push notifications to this device
    } catch (error) {
      console.error('Error registering for push notifications:', error);
    }
  };

  // Function to schedule a notification
  const scheduleNotification = async () => {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Mental Health Reminder',
          body: 'Take a break and check in with yourself.',
        },
        trigger: {
          seconds: 60 * 60, // Trigger after 1 hour (change this as needed)
        },
      });
    } catch (error) {
      console.error('Error scheduling notification:', error);
    }
  };

  // Register for notifications and schedule the first one
  useEffect(() => {
    registerForPushNotifications();
    scheduleNotification();

    // Listener for when a notification is clicked
    const subscription = Notifications.addNotificationResponseReceivedListener(response => {
      // Navigate to the Notifications screen
      navigation.navigate('Notifications'); // Make sure 'Notifications' matches the screen name exactly
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <View style={styles.header}>
      <Text style={styles.title}>Mental Health Companion</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Notifications')} // Navigate to the Notifications screen
        style={styles.notificationIcon}
      >
        <Ionicons name="notifications" size={24} color="#000" />
        {notificationCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{notificationCount}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  notificationIcon: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
});
