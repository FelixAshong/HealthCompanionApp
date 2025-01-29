import React, { useState, useContext } from 'react'; // Ensure useState is imported
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { AppContext } from '../context/AppContext';

export default function JournalScreen() {
  const { journalEntries, setJournalEntries } = useContext(AppContext);
  const [entry, setEntry] = useState(''); // Ensure useState is used correctly

  const saveEntry = () => {
    if (entry.trim()) {
      const newEntry = { date: new Date().toISOString(), text: entry };
      setJournalEntries([...journalEntries, newEntry]);
      setEntry('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Write about your day..."
        multiline
        value={entry}
        onChangeText={setEntry}
      />
      <TouchableOpacity style={styles.button} onPress={saveEntry}>
        <Text style={styles.buttonText}>Save Entry</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: {
    flex: 1,
    fontSize: 16,
    textAlignVertical: 'top',
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  button: {
    backgroundColor: '#6C63FF',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: { color: '#FFFFFF', textAlign: 'center', fontSize: 18 },
});