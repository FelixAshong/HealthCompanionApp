import React, { useState, useContext } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { AppContext } from '../context/AppContext';

export default function JournalScreen() {
  const { journalEntries, setJournalEntries } = useContext(AppContext);
  const [entry, setEntry] = useState('');

  const saveEntry = () => {
    if (entry.trim()) {
      const newEntry = { date: new Date().toISOString(), text: entry };
      setJournalEntries([...journalEntries, newEntry]);
      setEntry('');
      Keyboard.dismiss(); // Dismiss the keyboard after saving
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>
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
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  innerContainer: { flex: 1, padding: 16 },
  input: {
    flex: 1,
    fontSize: 16,
    textAlignVertical: 'top',
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#6C63FF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: { color: '#FFFFFF', fontSize: 18 },
});