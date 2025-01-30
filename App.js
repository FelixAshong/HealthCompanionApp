import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, StatusBar, LogBox } from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import { AppProvider } from './context/AppContext';
import * as SplashScreen from 'expo-splash-screen';

// Disable the splash screen auto-hide to manually control it
SplashScreen.preventAutoHideAsync();

// Hide splash screen after your app is ready (e.g., after loading data or async operations)
const hideSplashScreen = async () => {
  await SplashScreen.hideAsync();
};

export default function App() {
  useEffect(() => {
    // Example of async work before hiding the splash screen
    const prepareApp = async () => {
      try {
        // Simulate an async operation (e.g., loading resources, etc.)
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate a 2-second loading
        // After the async work, hide the splash screen
        hideSplashScreen();
      } catch (error) {
        console.error('Error during app preparation:', error);
      }
    };

    prepareApp();

    // Suppress specific logs or warnings using LogBox
    LogBox.ignoreLogs([
      'Warning: Failed prop type',  // Example warning to ignore
      'Shared value is accessed during the render phase'  // Suppressing Reanimated related warnings
    ]);
  }, []);

  return (
    <AppProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        <AppNavigator />
      </SafeAreaView>
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
