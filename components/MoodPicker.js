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
            selectedMood === index && styles.selectedMoodButtonText,
          ]}
          onPress={() => onSelectMood(index)}
          activeOpacity={0.7} // Gives a subtle fade effect when pressed
        >
          <Text
            style={[
              styles.moodText,
              selectedMood === index && styles.selectedMoodText,
            ]}
          >
            {mood}
          </Text>
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
    flexWrap: 'wrap',
  },
  moodButton: {
    padding: 15,
    borderRadius: 25,
    backgroundColor: '#F0F0F0',
    margin: 5,
  },
  selectedMoodButton: {
    backgroundColor: '#6C63FF',
  },
  selectedMoodButtonText: {
    borderWidth: 2,
    borderColor: '#fff',
  },
  moodText: {
    fontSize: 40,
    textAlign: 'center',
  },
  selectedMoodText: {
    color: '#fff',
  },
});
