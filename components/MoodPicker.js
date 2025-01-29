import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const moods = ['😭', '😢', '😐', '🙂', '😄'];

export default function MoodPicker({ selectedMood, onSelectMood }) {
  return (
    <View style={styles.container}>
      {moods.map((mood, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.moodButton,
            selectedMood === index && styles.selectedMoodButton,
          ]}
          onPress={() => onSelectMood(index)}
        >
          <Text style={styles.moodText}>{mood}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  moodButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
  },
  selectedMoodButton: {
    backgroundColor: '#6C63FF',
  },
  moodText: {
    fontSize: 30,
  },
});