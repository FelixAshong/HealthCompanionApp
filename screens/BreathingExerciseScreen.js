import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BreathingTimer from '../components/BreathingTimer';

export default function BreathingExerciseScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Guided Breathing Exercise</Text>
      <Text style={styles.instructions}>
        Inhale for 4 seconds, hold for 7 seconds, exhale for 8 seconds.
      </Text>
      <BreathingTimer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center' },
  instructions: { fontSize: 16, textAlign: 'center', marginVertical: 20 },
});