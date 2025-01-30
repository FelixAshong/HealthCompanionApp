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
  FlatList,
  Alert,
} from 'react-native';
import { AppContext } from '../context/AppContext';

export default function JournalScreen() {
  const { journalEntries, setJournalEntries } = useContext(AppContext);
  const [entry, setEntry] = useState('');
  const [characterCount, setCharacterCount] = useState(0);
  const maxCharacterLimit = 500; // Set a max character limit for the journal entry

  const saveEntry = () => {
    if (entry.trim()) {
      const newEntry = { date: new Date().toISOString(), text: entry };
      setJournalEntries([...journalEntries, newEntry]);
      setEntry('');
      setCharacterCount(0);
      Keyboard.dismiss(); // Dismiss the keyboard after saving
    } else {
      alert('Please write something before saving.');
    }
  };

  const deleteEntry = (index) => {
    Alert.alert(
      "Delete Entry",
      "Are you sure you want to delete this entry?",
      [
        { text: "Cancel" },
        { text: "Yes", onPress: () => removeEntry(index) },
      ]
    );
  };

  const removeEntry = (index) => {
    const updatedEntries = journalEntries.filter((_, i) => i !== index);
    setJournalEntries(updatedEntries);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const renderJournalEntry = ({ item, index }) => (
    <View style={styles.entryContainer}>
      <Text style={styles.entryDate}>{formatDate(item.date)}</Text>
      <Text style={styles.entryText}>{item.text}</Text>
      <TouchableOpacity onPress={() => deleteEntry(index)} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

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
            onChangeText={(text) => {
              setEntry(text);
              setCharacterCount(text.length);
            }}
            maxLength={maxCharacterLimit} // Limit character count
          />
          <Text style={styles.characterCount}>{characterCount}/{maxCharacterLimit} characters</Text>
          
          <TouchableOpacity style={styles.button} onPress={saveEntry}>
            <Text style={styles.buttonText}>Save Entry</Text>
          </TouchableOpacity>

          {/* Journal Entries List */}
          <FlatList
            data={journalEntries}
            renderItem={renderJournalEntry}
            keyExtractor={(item, index) => index.toString()}
            style={styles.entriesList}
          />
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
  characterCount: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
    textAlign: 'right',
  },
  button: {
    backgroundColor: '#6C63FF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: { color: '#FFFFFF', fontSize: 18 },
  entriesList: {
    marginTop: 20,
  },
  entryContainer: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  entryDate: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
  },
  entryText: {
    fontSize: 16,
    color: '#333',
  },
  deleteButton: {
    marginTop: 10,
    backgroundColor: '#FF6347',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});
