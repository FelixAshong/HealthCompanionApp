import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import AffirmationCard from '../components/AffirmationCard';

const affirmations = [
  'I am worthy of love and respect.',
  'I am capable of achieving my goals.',
  'I am grateful for the good in my life.',
  'I am strong and resilient.',
  'I am at peace with myself.',
];

export default function AffirmationsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daily Affirmations</Text>
      <FlatList
        data={affirmations}
        renderItem={({ item }) => <AffirmationCard affirmation={item} />}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
});