import React from 'react';
import { SafeAreaView, StyleSheet, StatusBar, LogBox } from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import { AppProvider } from './context/AppContext';
import { configureReanimatedLogger, ReanimatedLogLevel } from 'react-native-reanimated';

// Disable specific warnings
LogBox.ignoreLogs([
  '[Reanimated] Reading from `value` during component render',
]);

// Disable Reanimated strict mode warnings
configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false, // Disable strict mode
});

export default function App() {
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
