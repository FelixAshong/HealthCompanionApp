import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // For icons
import HomeScreen from '../screens/HomeScreen';
import MoodTrackerScreen from '../screens/MoodTrackerScreen';
import JournalScreen from '../screens/JournalScreen';
import BreathingExerciseScreen from '../screens/BreathingExerciseScreen';
import AffirmationsScreen from '../screens/AffirmationsScreen';
import GratitudeLogScreen from '../screens/GratitudeLogScreen';
import ResourcesScreen from '../screens/ResourcesScreen';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            // Set icons for each tab
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'MoodTracker') {
              iconName = focused ? 'happy' : 'happy-outline';
            } else if (route.name === 'Journal') {
              iconName = focused ? 'book' : 'book-outline';
            } else if (route.name === 'BreathingExercise') {
              iconName = focused ? 'leaf' : 'leaf-outline';
            } else if (route.name === 'Affirmations') {
              iconName = focused ? 'heart' : 'heart-outline';
            } else if (route.name === 'GratitudeLog') {
              iconName = focused ? 'thumbs-up' : 'thumbs-up-outline';
            } else if (route.name === 'Resources') {
              iconName = focused ? 'information-circle' : 'information-circle-outline';
            }

            // Return the icon component
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#6C63FF', // Active tab color
          tabBarInactiveTintColor: 'gray', // Inactive tab color
          tabBarStyle: { paddingBottom: 5, paddingTop: 5 }, // Customize tab bar style
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Home' }}
        />
        <Tab.Screen
          name="MoodTracker"
          component={MoodTrackerScreen}
          options={{ title: 'Mood' }}
        />
        <Tab.Screen
          name="Journal"
          component={JournalScreen}
          options={{ title: 'Journal' }}
        />
        <Tab.Screen
          name="BreathingExercise"
          component={BreathingExerciseScreen}
          options={{ title: 'Breathing' }}
        />
        <Tab.Screen
          name="Affirmations"
          component={AffirmationsScreen}
          options={{ title: 'Affirmations' }}
        />
        <Tab.Screen
          name="GratitudeLog"
          component={GratitudeLogScreen}
          options={{ title: 'Gratitude' }}
        />
        <Tab.Screen
          name="Resources"
          component={ResourcesScreen}
          options={{ title: 'Resources' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}