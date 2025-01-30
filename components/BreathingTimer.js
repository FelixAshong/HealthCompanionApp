import React, { useState, useEffect } from 'react';
import { 
  View, Text, StyleSheet, TouchableOpacity, Animated, Vibration, Alert 
} from 'react-native';
import { Audio } from 'expo-av'; // Make sure to install expo-av

const DEFAULT_BREATHING_SETTINGS = {
  inhaleDuration: 4,
  holdDuration: 4,
  exhaleDuration: 6,
};

export default function BreathingTimer() {
  const [isBreathing, setIsBreathing] = useState(false);
  const [currentPhase, setCurrentPhase] = useState('inhale');
  const [timer, setTimer] = useState(0);
  const [progress, setProgress] = useState(new Animated.Value(0));
  const [breathingSettings, setBreathingSettings] = useState(DEFAULT_BREATHING_SETTINGS);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [sessionHistory, setSessionHistory] = useState([]);

  const [sound, setSound] = useState(null);

  // Load sound effects
  useEffect(() => {
    async function loadSound() {
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/inhale.mp3') // Ensure this file exists
      );
      setSound(sound);
    }
    loadSound();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  // Timer Logic
  useEffect(() => {
    let interval;
    if (isBreathing) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    } else {
      setTimer(0); 
    }
    return () => clearInterval(interval);
  }, [isBreathing]);

  useEffect(() => {
    const { inhaleDuration, holdDuration, exhaleDuration } = breathingSettings;

    if (isBreathing) {
      if (currentPhase === 'inhale' && timer >= inhaleDuration) {
        setTimer(0);
        setCurrentPhase('hold');
        handlePhaseChange();
      }
      if (currentPhase === 'hold' && timer >= holdDuration) {
        setTimer(0);
        setCurrentPhase('exhale');
        handlePhaseChange();
      }
      if (currentPhase === 'exhale' && timer >= exhaleDuration) {
        setTimer(0);
        setCurrentPhase('inhale');
        handlePhaseChange();
      }

      // Smooth Progress Bar Animation
      const phaseDuration = currentPhase === 'inhale' 
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

  const handlePhaseChange = async () => {
    if (soundEnabled && sound) {
      await sound.replayAsync();
    }
    if (vibrationEnabled) {
      Vibration.vibrate();
    }
  };

  const toggleBreathing = async () => {
    setIsBreathing((prev) => {
      if (prev && sound) {
        sound.stopAsync(); // Stop sound when stopping
      }
      return !prev;
    });
  };

  const resetBreathing = () => {
    setTimer(0);
    setCurrentPhase('inhale');
    setIsBreathing(false);
    progress.setValue(0);
  };

  const saveSession = () => {
    const newSession = {
      phaseTimes: {
        inhale: breathingSettings.inhaleDuration,
        hold: breathingSettings.holdDuration,
        exhale: breathingSettings.exhaleDuration,
      },
      completedTime: timer,
    };
    setSessionHistory((prevHistory) => [...prevHistory, newSession]);
    Alert.alert('Session Saved!', 'Your breathing session has been saved.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.phase}>{currentPhase.toUpperCase()}</Text>
      <Text style={styles.timer}>{timer}s</Text>
      
      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
        <Animated.View
          style={[
            styles.progressBar,
            { width: progress.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }) },
          ]}
        />
      </View>

      {/* Start / Stop Buttons */}
      <TouchableOpacity style={styles.button} onPress={toggleBreathing}>
        <Text style={styles.buttonText}>{isBreathing ? 'Stop' : 'Start'}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.resetButton} onPress={resetBreathing}>
        <Text style={styles.buttonText}>Reset</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.saveButton} onPress={saveSession}>
        <Text style={styles.buttonText}>Save Session</Text>
      </TouchableOpacity>

      {/* Settings Section */}
      <View style={styles.settingsContainer}>
        <Text style={styles.settingsTitle}>Adjust Breathing:</Text>
        <Text style={styles.settingsText}>Inhale: {breathingSettings.inhaleDuration}s</Text>
        <Text style={styles.settingsText}>Hold: {breathingSettings.holdDuration}s</Text>
        <Text style={styles.settingsText}>Exhale: {breathingSettings.exhaleDuration}s</Text>

        <Text style={styles.settingsTitle}>Settings:</Text>
        <TouchableOpacity onPress={() => setSoundEnabled((prev) => !prev)}>
          <Text style={styles.settingsText}>Sound: {soundEnabled ? 'On' : 'Off'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setVibrationEnabled((prev) => !prev)}>
          <Text style={styles.settingsText}>Vibration: {vibrationEnabled ? 'On' : 'Off'}</Text>
        </TouchableOpacity>
      </View>

      {/* Session History */}
      <View style={styles.historyContainer}>
        <Text style={styles.historyTitle}>Session History:</Text>
        {sessionHistory.length === 0 ? (
          <Text>No sessions recorded yet.</Text>
        ) : (
          sessionHistory.map((session, index) => (
            <Text key={index} style={styles.historyText}>
              Inhale: {session.phaseTimes.inhale}s | Hold: {session.phaseTimes.hold}s | Exhale: {session.phaseTimes.exhale}s | Time: {session.completedTime}s
            </Text>
          ))
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f9f9f9', padding: 20 },
  phase: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  timer: { fontSize: 50, fontWeight: 'bold', marginVertical: 20, color: '#333' },
  progressBarContainer: { width: '100%', height: 10, backgroundColor: '#ddd', borderRadius: 5, overflow: 'hidden', marginVertical: 20 },
  progressBar: { height: '100%', backgroundColor: '#6C63FF' },
  button: { backgroundColor: '#6C63FF', padding: 15, borderRadius: 10, width: 150, alignItems: 'center', marginVertical: 10 },
  resetButton: { backgroundColor: '#FF6347', padding: 15, borderRadius: 10, width: 150, alignItems: 'center', marginVertical: 10 },
  saveButton: { backgroundColor: '#28a745', padding: 15, borderRadius: 10, width: 150, alignItems: 'center', marginVertical: 10 },
});

