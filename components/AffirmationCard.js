import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AffirmationCard({ affirmation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>"{affirmation}"</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F0F0F0',
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
  },
  text: {
    fontSize: 18,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});