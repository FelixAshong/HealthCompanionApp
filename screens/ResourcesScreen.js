import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';

const resources = [
  {
    title: 'National Suicide Prevention Lifeline',
    description: 'Call 1-800-273-TALK (8255) for immediate help.',
    link: 'tel:18002738255',
  },
  {
    title: 'Crisis Text Line',
    description: 'Text HOME to 741741 to connect with a crisis counselor.',
    link: 'sms:741741',
  },
  {
    title: 'Mental Health America',
    description: 'Find resources and support for mental health.',
    link: 'https://www.mhanational.org',
  },
];

export default function ResourcesScreen() {
  const handlePress = (link) => {
    Linking.openURL(link);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mental Health Resources</Text>
      {resources.map((resource, index) => (
        <TouchableOpacity
          key={index}
          style={styles.resourceCard}
          onPress={() => handlePress(resource.link)}
        >
          <Text style={styles.resourceTitle}>{resource.title}</Text>
          <Text style={styles.resourceDescription}>{resource.description}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  resourceCard: {
    backgroundColor: '#F0F0F0',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  resourceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  resourceDescription: {
    fontSize: 14,
    color: '#666666',
    marginTop: 5,
  },
});