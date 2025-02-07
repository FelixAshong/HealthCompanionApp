import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, LogBox } from 'react-native';
import AppNavigator from './navigation/AppNavigator'; // Your navigation setup
import { AppProvider } from './context/AppContext'; // Global context provider
import * as SplashScreen from 'expo-splash-screen'; // Import Expo SplashScreen
import SplashScreenComponent from './components/SplashScreen'; // Your custom SplashScreen component

// Disable the splash screen auto-hide, so we can manually control it
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isSplashReady, setSplashReady] = useState(false);

  // Handle splash screen finish and hide it
  const onSplashFinish = () => {
    setSplashReady(true); // Set the state to hide splash screen after finish
    SplashScreen.hideAsync(); // Hide the Expo splash screen
  };

  useEffect(() => {
    // Simulate an async operation (e.g., loading resources, etc.)
    const prepareApp = async () => {
      try {
        // Simulate a 2-second delay for loading resources or async tasks
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Call the splash screen finish function
        onSplashFinish();
      } catch (error) {
        console.error("Error during app preparation:", error);
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
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        
        {/* Conditionally render the SplashScreen or the AppNavigator */}
        {!isSplashReady ? (
          // Show custom splash screen while loading
          <SplashScreenComponent onFinish={onSplashFinish} />
        ) : (
          // Show the main app after splash screen is ready
          <AppNavigator />
        )}
      </SafeAreaView>
    </AppProvider>
  );
}
