import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { AppContext } from '../context/AppContext';

export default function GratitudeLogScreen() {
  const { gratitudeEntries, setGratitudeEntries } = useContext(AppContext);
  const [entry, setEntry] = useState('');

  const saveGratitudeEntry = () => {
    if (entry.trim()) {
      const newEntry = { date: new Date().toISOString(), text: entry };
      setGratitudeEntries([...gratitudeEntries, newEntry]);
      setEntry('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gratitude Log</Text>
      <TextInput
        style={styles.input}
        placeholder="What are you grateful for today?"
        value={entry}
        onChangeText={setEntry}
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={saveGratitudeEntry}>
        <Text style={styles.buttonText}>Save Entry</Text>
      </TouchableOpacity>
      <FlatList
        data={gratitudeEntries}
        renderItem={({ item }) => (
          <View style={styles.entry}>
            <Text style={styles.date}>{new Date(item.date).toLocaleDateString()}</Text>
            <Text style={styles.text}>{item.text}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    textAlignVertical: 'top',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#6C63FF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: { color: '#FFFFFF', fontSize: 18 },
  entry: { marginVertical: 10 },
  date: { fontSize: 14, color: '#666666' },
  text: { fontSize: 16 },
});