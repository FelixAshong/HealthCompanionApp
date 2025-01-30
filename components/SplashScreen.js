import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

interface SplashScreenProps {
  onFinish: () => void; // Callback to notify when splash screen should finish
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  useEffect(() => {
    // Simulate a loading delay
    const timer = setTimeout(() => {
      onFinish(); // Notify parent component to hide splash screen
    }, 3000); // 3-second delay

    return () => clearTimeout(timer); // Cleanup the timer
  }, [onFinish]);

  return (
    <View style={styles.container}>
      {/* Logo in the middle */}
      <Image
        source={require('../assets/health.jpg')} // Replace with your logo path
        style={styles.logo}
      />
      {/* App name right under the logo */}
      <Text style={styles.appName}>Mental Health Companion</Text>
      {/* Your name at the bottom */}
      <Text style={styles.author}>phleodelly</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff', // White background
    paddingHorizontal: 20, // Added padding for smaller screens
  },
  logo: {
    width: 150, // Adjust the size to fit your design
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  appName: {
    fontSize: 24, // Increase font size for a more stylized look
    fontWeight: '600', // A lighter weight for a stylish effect
    color: '#007AFF', // Blue text color
    textAlign: 'center',
    fontFamily: 'Arial', // You can replace this with a custom font if desired
    marginBottom: 20, // Adds space between the logo and the app name
  },
  author: {
    position: 'absolute',
    bottom: 20, // Position near the bottom
    fontSize: 18,
    fontWeight: '400', // Slightly lighter weight for your name
    color: '#007AFF', // Blue text color for your name
    textAlign: 'center',
    fontFamily: 'Arial', // Replace with custom font if needed
    width: '100%', // Ensure it's properly aligned in smaller screens
  },
});

export default SplashScreen;
