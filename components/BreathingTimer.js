import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Vibration } from 'react-native';

// Define default breathing settings (in seconds)
const DEFAULT_BREATHING_SETTINGS = {
  inhaleDuration: 4, // inhale for 4 seconds
  holdDuration: 4,   // hold for 4 seconds
  exhaleDuration: 6, // exhale for 6 seconds
};

export default function BreathingTimer() {
  const [isBreathing, setIsBreathing] = useState(false);
  const [currentPhase, setCurrentPhase] = useState('inhale'); // inhale, hold, exhale
  const [timer, setTimer] = useState(0);
  const [progress, setProgress] = useState(new Animated.Value(0)); // For progress bar animation
  const [breathingSettings, setBreathingSettings] = useState(DEFAULT_BREATHING_SETTINGS);

  useEffect(() => {
    let interval;
    if (isBreathing) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    } else {
      setTimer(0); // Reset the timer if breathing is stopped
    }
    return () => clearInterval(interval);
  }, [isBreathing]);

  useEffect(() => {
    // Handle phases (Inhale, Hold, Exhale)
    if (isBreathing) {
      const { inhaleDuration, holdDuration, exhaleDuration } = breathingSettings;

      if (currentPhase === 'inhale' && timer >= inhaleDuration) {
        setTimer(0);
        setCurrentPhase('hold');
        Vibration.vibrate(); // Optional: Vibration for phase change
      }
      if (currentPhase === 'hold' && timer >= holdDuration) {
        setTimer(0);
        setCurrentPhase('exhale');
        Vibration.vibrate(); // Optional: Vibration for phase change
      }
      if (currentPhase === 'exhale' && timer >= exhaleDuration) {
        setTimer(0);
        setCurrentPhase('inhale');
        Vibration.vibrate(); // Optional: Vibration for phase change
      }

      // Animate the progress bar based on the phase duration
      const phaseDuration =
        currentPhase === 'inhale'
          ? inhaleDuration
          : currentPhase === 'hold'
          ? holdDuration
          : exhaleDuration;
      const progressValue = timer / phaseDuration;
      Animated.timing(progress, {
        toValue: progressValue,
        duration: 1000,
        useNativeDriver: false,
      }).start();
    }
  }, [timer, currentPhase, isBreathing, breathingSettings]);

  const resetBreathing = () => {
    setTimer(0);
    setCurrentPhase('inhale');
    setIsBreathing(false);
    progress.setValue(0); // Reset the progress bar
  };

  return (
    <View style={styles.container}>
      <Text style={styles.phase}>{currentPhase.toUpperCase()}</Text>
      <Text style={styles.timer}>{timer}s</Text>
      
      <View style={styles.progressBarContainer}>
        <Animated.View
          style={[
            styles.progressBar,
            { width: progress.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }) },
          ]}
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => setIsBreathing(!isBreathing)}
      >
        <Text style={styles.buttonText}>{isBreathing ? 'Stop' : 'Start'}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.resetButton}
        onPress={resetBreathing}
      >
        <Text style={styles.buttonText}>Reset</Text>
      </TouchableOpacity>

      {/* Customizable Breathing Settings */}
      <View style={styles.settingsContainer}>
        <Text style={styles.settingsTitle}>Adjust Breathing:</Text>
        <Text style={styles.settingsText}>Inhale: {breathingSettings.inhaleDuration}s</Text>
        <Text style={styles.settingsText}>Hold: {breathingSettings.holdDuration}s</Text>
        <Text style={styles.settingsText}>Exhale: {breathingSettings.exhaleDuration}s</Text>

        {/* Example: You could add sliders here to adjust inhale/hold/exhale */}
        {/* For now, it's just static settings */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  phase: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  timer: {
    fontSize: 50,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#333',
  },
  progressBarContainer: {
    width: '100%',
    height: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
    overflow: 'hidden',
    marginVertical: 20,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#6C63FF',
  },
  button: {
    backgroundColor: '#6C63FF',
    padding: 15,
    borderRadius: 10,
    width: 150,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  resetButton: {
    backgroundColor: '#FF6347',
    padding: 15,
    borderRadius: 10,
    width: 150,
    alignItems: 'center',
    marginVertical: 10,
  },
  settingsContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  settingsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  settingsText: {
    fontSize: 16,
    color: '#333',
  },
});
