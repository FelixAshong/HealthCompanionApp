import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MoodPicker from '../components/MoodPicker';
import { AppContext } from '../context/AppContext';

export default function MoodTrackerScreen() {
  const { moodData, setMoodData } = useContext(AppContext);
  const [selectedMood, setSelectedMood] = useState(2);

  const saveMood = () => {
    const newMoodEntry = { date: new Date().toISOString(), mood: selectedMood };
    setMoodData([...moodData, newMoodEntry]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>How are you feeling today?</Text>
      <MoodPicker
        selectedMood={selectedMood}
        onSelectMood={setSelectedMood} // Ensure this prop is passed correctly
      />
      <TouchableOpacity style={styles.button} onPress={saveMood}>
        <Text style={styles.buttonText}>Save Mood</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center' },
  button: {
    backgroundColor: '#6C63FF',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: { color: '#FFFFFF', textAlign: 'center', fontSize: 18 },
});