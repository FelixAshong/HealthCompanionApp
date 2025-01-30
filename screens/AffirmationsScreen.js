import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, Share, Animated, Alert } from 'react-native';
import { BarChart, PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const affirmationsPool = [
  'I am worthy of love and respect.',
  'I am capable of achieving my goals.',
  'I am grateful for the good in my life.',
  'I am strong and resilient.',
  'I am at peace with myself.',
  'I am deserving of all the good things that come into my life.',
  'I radiate positive energy.',
  'I trust the process of life.',
  'I am in charge of how I feel and today I choose happiness.',
  'I am confident in my abilities.',
];

const motivationalQuotes = [
  "The best time to start was yesterday. The next best time is now.",
  "Believe you can and you're halfway there.",
  "Success is not final, failure is not fatal: It is the courage to continue that counts.",
  "The only way to do great work is to love what you do.",
  "You are stronger than you think.",
];

function getRandomAffirmation() {
  const randomIndex = Math.floor(Math.random() * affirmationsPool.length);
  return affirmationsPool[randomIndex];
}

function getRandomQuote() {
  const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
  return motivationalQuotes[randomIndex];
}

export default function AffirmationsScreen() {
  const [completedAffirmations, setCompletedAffirmations] = useState(0);
  const [totalAffirmations, setTotalAffirmations] = useState(0); // Starts at 0, will increase dynamically
  const [streak, setStreak] = useState(0); // Track streak of completed affirmations
  const fadeAnim = useState(new Animated.Value(0))[0]; // Fade animation for each card
  const [currentAffirmation, setCurrentAffirmation] = useState(getRandomAffirmation());
  const [currentQuote, setCurrentQuote] = useState(getRandomQuote());
  const [dailyLimitReached, setDailyLimitReached] = useState(false); // Limit the daily affirmations

  const MAX_AFFIRMATIONS_PER_DAY = 10; // Limit for affirmations per day

  const handleCompleteAffirmation = () => {
    if (dailyLimitReached) {
      Alert.alert("Daily limit reached!", "You have completed all affirmations for today.");
      return;
    }

    setCompletedAffirmations((prev) => {
      const newCount = prev + 1;
      setTotalAffirmations(newCount); // Increment the total affirmations dynamically
      if (newCount > prev) {
        // If affirmation is completed, increment the streak
        setStreak(streak + 1);
      }
      return newCount;
    });

    // Change to a random affirmation and quote for the next interaction
    setCurrentAffirmation(getRandomAffirmation());
    setCurrentQuote(getRandomQuote());

    // Trigger fade animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    if (completedAffirmations + 1 >= MAX_AFFIRMATIONS_PER_DAY) {
      setDailyLimitReached(true);
    }
  };

  const handleShare = async (affirmation) => {
    try {
      await Share.share({
        message: affirmation,
      });

      // Record share as a completed affirmation
      handleCompleteAffirmation();

      // Show confirmation message for share success
      Alert.alert("Shared Successfully!", "Your affirmation has been shared.");

    } catch (error) {
      console.error("Error sharing the affirmation", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Daily Affirmations</Text>
        <Text style={styles.streak}>Streak: {streak} Days</Text>

        {/* Random Affirmation */}
        <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
          <Text style={styles.affirmationText}>{currentAffirmation}</Text>
          <Text style={styles.quoteText}>{currentQuote}</Text>
          <TouchableOpacity onPress={handleCompleteAffirmation} style={styles.completeButton}>
            <Text style={styles.completeText}>Complete Affirmation</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleShare(currentAffirmation)} style={styles.shareButton}>
            <Text style={styles.shareText}>Share</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Bar Chart: Affirmation Completion Progress */}
        <Text style={styles.chartTitle}>Affirmation Progress</Text>
        <BarChart
          data={{
            labels: ['Completed', 'Remaining'],
            datasets: [
              {
                data: [completedAffirmations, totalAffirmations - completedAffirmations],
              },
            ],
          }}
          width={screenWidth - 32}
          height={220}
          yAxisLabel=""
          chartConfig={{
            backgroundColor: '#6C63FF',
            backgroundGradientFrom: '#6C63FF',
            backgroundGradientTo: '#C1BFFF',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          style={styles.chart}
        />

        {/* Pie Chart: Daily Affirmation Completion */}
        <Text style={styles.chartTitle}>Affirmation Breakdown</Text>
        <PieChart
          data={[
            {
              name: 'Completed',
              population: completedAffirmations,
              color: '#4CAF50',
              legendFontColor: '#333',
              legendFontSize: 14,
            },
            {
              name: 'Remaining',
              population: totalAffirmations - completedAffirmations,
              color: '#FF6347',
              legendFontColor: '#333',
              legendFontSize: 14,
            },
          ]}
          width={screenWidth - 32}
          height={220}
          chartConfig={{
            backgroundGradientFrom: '#f9f9f9',
            backgroundGradientTo: '#f9f9f9',
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  streak: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6347',
    marginBottom: 20,
  },
  affirmationText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  quoteText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#888',
    textAlign: 'center',
    marginBottom: 20,
  },
  completeButton: {
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    marginTop: 10,
  },
  completeText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  shareButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#FF6347',
    borderRadius: 8,
  },
  shareText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  chart: {
    borderRadius: 16,
    marginBottom: 20,
  },
  card: {
    width: screenWidth - 32,
    padding: 15,
    backgroundColor: '#F1F1F1',
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
});

