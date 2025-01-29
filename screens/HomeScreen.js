import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Welcome Section */}
      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeTitle}>Welcome to Your Mental Health Companion</Text>
        <Text style={styles.welcomeText}>
          Your journey to better mental health starts here. Track your mood, journal your thoughts,
          practice mindfulness, and discover resources to support your well-being.
        </Text>
      </View>

      {/* App Features Section */}
      <View style={styles.featuresSection}>
        <Text style={styles.sectionTitle}>App Features</Text>
        <View style={styles.featureCard}>
          <Image
            source={require('../assets/mood-tracker-icon.png')} // Replace with your icon
            style={styles.featureIcon}
          />
          <Text style={styles.featureTitle}>Mood Tracker</Text>
          <Text style={styles.featureDescription}>
            Log your daily mood and track trends over time to better understand your emotional
            well-being.
          </Text>
        </View>
        <View style={styles.featureCard}>
          <Image
            source={require('../assets/journal-icon.png')} // Replace with your icon
            style={styles.featureIcon}
          />
          <Text style={styles.featureTitle}>Journal</Text>
          <Text style={styles.featureDescription}>
            Write about your day, reflect on your thoughts, and gain clarity through journaling.
          </Text>
        </View>
        <View style={styles.featureCard}>
          <Image
            source={require('../assets/breathing-icon.png')} // Replace with your icon
            style={styles.featureIcon}
          />
          <Text style={styles.featureTitle}>Guided Breathing</Text>
          <Text style={styles.featureDescription}>
            Practice mindfulness with guided breathing exercises to reduce stress and improve focus.
          </Text>
        </View>
      </View>

      {/* Call-to-Action Section */}
      <View style={styles.ctaSection}>
        <Text style={styles.ctaText}>Ready to Get Started?</Text>
        <TouchableOpacity
          style={styles.ctaButton}
          onPress={() => navigation.navigate('MoodTracker')}
        >
          <Text style={styles.ctaButtonText}>Track Your Mood</Text>
        </TouchableOpacity>
      </View>

      {/* Footer Section */}
      <View style={styles.footerSection}>
        <Text style={styles.footerText}>
          Your mental health matters. Take small steps every day to nurture your well-being.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  welcomeSection: {
    marginBottom: 30,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 24,
  },
  featuresSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 20,
  },
  featureCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureIcon: {
    width: 40,
    height: 40,
    marginRight: 15,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
  },
  featureDescription: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  ctaSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  ctaText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 15,
  },
  ctaButton: {
    backgroundColor: '#6C63FF',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  ctaButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footerSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  footerText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 20,
  },
});