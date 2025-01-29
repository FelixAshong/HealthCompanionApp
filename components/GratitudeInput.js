import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';

export default function GratitudeInput({ onSave }) {
  const [entry, setEntry] = useState('');

  const handleSave = () => {
    if (entry.trim()) {
      onSave(entry);
      setEntry('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="What are you grateful for today?"
        value={entry}
        onChangeText={setEntry}
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  input: {
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#6C63FF',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});