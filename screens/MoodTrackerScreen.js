import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert, Image } from 'react-native';
import MoodPicker from '../components/MoodPicker';
import { AppContext } from '../context/AppContext';
import { PieChart } from 'react-native-chart-kit'; // For the Pie chart (Install react-native-chart-kit)

export default function MoodTrackerScreen() {
  const { moodData, setMoodData } = useContext(AppContext);
  const [selectedMood, setSelectedMood] = useState(2);
  const [moodDistribution, setMoodDistribution] = useState([0, 0, 0, 0, 0]); // Stores counts for each mood (0 to 4)

  useEffect(() => {
    // Update mood distribution whenever mood data changes
    const newDistribution = [0, 0, 0, 0, 0];
    moodData.forEach(entry => {
      newDistribution[entry.mood] += 1;
    });
    setMoodDistribution(newDistribution);
  }, [moodData]);

  const saveMood = () => {
    const newMoodEntry = { date: new Date().toISOString(), mood: selectedMood };
    setMoodData([...moodData, newMoodEntry]);
  };

  const deleteMoodHistory = () => {
    Alert.alert(
      "Clear Mood History",
      "Are you sure you want to clear all mood history?",
      [
        { text: "Cancel" },
        {
          text: "Yes", 
          onPress: () => setMoodData([]),
        },
      ]
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const calculateStreak = () => {
    if (moodData.length === 0) return 0;
    let streak = 1;
    let lastDate = new Date(moodData[moodData.length - 1].date);
    for (let i = moodData.length - 2; i >= 0; i--) {
      const currentDate = new Date(moodData[i].date);
      const diffInDays = Math.floor((lastDate - currentDate) / (1000 * 3600 * 24));
      if (diffInDays === 1) {
        streak++;
        lastDate = currentDate;
      } else {
        break;
      }
    }
    return streak;
  };

  const renderMoodHistory = ({ item }) => {
    return (
      <View style={styles.historyItem}>
        <Text style={styles.historyText}>{formatDate(item.date)} - Mood {item.mood}</Text>
      </View>
    );
  };

  const getMoodColor = (mood) => {
    switch (mood) {
      case 0: return '#FF6347'; // Red for low mood
      case 1: return '#FFA500'; // Orange for slightly low mood
      case 2: return '#FFFF00'; // Yellow for neutral mood
      case 3: return '#32CD32'; // Green for happy mood
      case 4: return '#0000FF'; // Blue for very happy
      default: return '#FFFFFF';
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>How are you feeling today?</Text>
      
      {/* Mood Picker with Color Feedback */}
      <MoodPicker selectedMood={selectedMood} onSelectMood={setSelectedMood} />
      
      <View style={[styles.moodIndicator, { backgroundColor: getMoodColor(selectedMood) }]}>
        <Text style={styles.moodIndicatorText}>{['Low', 'Slightly Low', 'Neutral', 'Happy', 'Very Happy'][selectedMood]}</Text>
      </View>
      
      {/* Button to save mood */}
      <TouchableOpacity style={styles.button} onPress={saveMood}>
        <Text style={styles.buttonText}>Save Mood</Text>
      </TouchableOpacity>
      
      {/* Display mood streak */}
      <Text style={styles.streakText}>Current Mood Streak: {calculateStreak()} day(s)</Text>

      {/* Mood Distribution Pie Chart */}
      <Text style={styles.chartTitle}>Mood Distribution</Text>
      <PieChart
        data={moodDistribution.map((count, index) => ({
          name: ['Low', 'Slightly Low', 'Neutral', 'Happy', 'Very Happy'][index],
          population: count,
          color: getMoodColor(index),
          legendFontColor: '#000',
          legendFontSize: 15
        }))}
        width={300}
        height={220}
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: () => `rgba(0, 0, 0, 1)`,
          strokeWidth: 2,
          useShadowColorFromDataset: false,
        }}
        accessor="population"
        backgroundColor="transparent"
      />
      
      {/* Show Mood History */}
      <Text style={styles.historyTitle}>Mood History</Text>
      <FlatList
        data={moodData}
        renderItem={renderMoodHistory}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.historyList}
      />

      {/* Clear History Button */}
      <TouchableOpacity style={styles.clearButton} onPress={deleteMoodHistory}>
        <Text style={styles.clearButtonText}>Clear Mood History</Text>
      </TouchableOpacity>

      {/* Reset Mood Data */}
      <TouchableOpacity style={styles.clearButton} onPress={() => setMoodData([])}>
        <Text style={styles.clearButtonText}>Reset All Data</Text>
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
  moodIndicator: {
    padding: 20,
    marginTop: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  moodIndicatorText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  streakText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 20,
  },
  chartTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 30,
    textAlign: 'center',
  },
  historyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  historyList: {
    marginTop: 10,
    paddingBottom: 20,
  },
  historyItem: {
    padding: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    marginBottom: 8,
  },
  historyText: {
    fontSize: 16,
    color: '#333',
  },
  clearButton: {
    backgroundColor: '#FF6347',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  clearButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 18,
  },
});
