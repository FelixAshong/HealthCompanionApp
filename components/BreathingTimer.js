import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function BreathingTimer() {
  const [isBreathing, setIsBreathing] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval;
    if (isBreathing) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isBreathing]);

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>{timer}s</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setIsBreathing(!isBreathing)}
      >
        <Text style={styles.buttonText}>
          {isBreathing ? 'Stop' : 'Start'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  timer: {
    fontSize: 40,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#6C63FF',
    padding: 15,
    borderRadius: 10,
    width: 100,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});