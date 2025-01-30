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
  Image,
  ScrollView, // Import ScrollView to make the screen scrollable
} from 'react-native';
import { AppContext } from '../context/AppContext';
import { launchImageLibrary } from 'react-native-image-picker'; // For image picking
import MoodPicker from '../components/MoodPicker'; // Custom component for selecting mood

export default function JournalScreen() {
  const { journalEntries, setJournalEntries } = useContext(AppContext);
  const [entry, setEntry] = useState('');
  const [characterCount, setCharacterCount] = useState(0);
  const [imageUri, setImageUri] = useState(null);
  const [mood, setMood] = useState(2); // Default mood (e.g., Neutral)
  const [tags, setTags] = useState([]);
  const [searchText, setSearchText] = useState('');
  const maxCharacterLimit = 500;

  const saveEntry = () => {
    if (entry.trim()) {
      const newEntry = { 
        date: new Date().toISOString(),
        text: entry,
        imageUri,
        mood,
        tags,
      };
      setJournalEntries([...journalEntries, newEntry]);
      setEntry('');
      setCharacterCount(0);
      setImageUri(null);
      setMood(2);
      setTags([]);
      Keyboard.dismiss();
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

  const handleImagePick = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 1 }, (response) => {
      if (!response.didCancel && !response.error) {
        setImageUri(response.assets[0].uri);
      }
    });
  };

  const handleTagChange = (tag) => {
    if (tags.includes(tag)) {
      setTags(tags.filter((t) => t !== tag));
    } else {
      setTags([...tags, tag]);
    }
  };

  const filteredEntries = journalEntries.filter((entry) =>
    entry.text.toLowerCase().includes(searchText.toLowerCase()) ||
    entry.tags.some(tag => tag.toLowerCase().includes(searchText.toLowerCase()))
  );

  const renderJournalEntry = ({ item, index }) => (
    <View style={styles.entryContainer}>
      <Text style={styles.entryDate}>{formatDate(item.date)}</Text>
      <Text style={styles.entryText}>{item.text}</Text>
      {item.imageUri && <Image source={{ uri: item.imageUri }} style={styles.entryImage} />}
      <Text style={styles.entryMood}>Mood: {item.mood}</Text>
      <Text style={styles.entryTags}>Tags: {item.tags.join(', ')}</Text>
      <TouchableOpacity onPress={() => deleteEntry(index)} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {/* Search Bar */}
          <TextInput
            style={styles.searchInput}
            placeholder="Search journal entries"
            value={searchText}
            onChangeText={setSearchText}
          />

          {/* Mood Picker */}
          <MoodPicker selectedMood={mood} onSelectMood={setMood} />

          {/* Text Input for Journal Entry */}
          <TextInput
            style={styles.input}
            placeholder="Write about your day..."
            multiline
            value={entry}
            onChangeText={(text) => {
              setEntry(text);
              setCharacterCount(text.length);
            }}
            maxLength={maxCharacterLimit}
          />
          <Text style={styles.characterCount}>{characterCount}/{maxCharacterLimit} characters</Text>

          {/* Tags */}
          <View style={styles.tagContainer}>
            <Text style={styles.tagTitle}>Tags:</Text>
            {['Personal', 'Work', 'Health'].map((tag) => (
              <TouchableOpacity
                key={tag}
                onPress={() => handleTagChange(tag)}
                style={[styles.tagButton, tags.includes(tag) && styles.selectedTagButton]}
              >
                <Text style={styles.tagText}>{tag}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Image Picker */}
          <TouchableOpacity onPress={handleImagePick} style={styles.imageButton}>
            <Text style={styles.imageButtonText}>Pick an Image</Text>
          </TouchableOpacity>
          {imageUri && <Image source={{ uri: imageUri }} style={styles.imagePreview} />}

          {/* Save Button */}
          <TouchableOpacity style={styles.button} onPress={saveEntry}>
            <Text style={styles.buttonText}>Save Entry</Text>
          </TouchableOpacity>

          {/* Journal Entries List */}
          <FlatList
            data={filteredEntries}
            renderItem={renderJournalEntry}
            keyExtractor={(item) => item.date}
            style={styles.entriesList}
          />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollViewContent: { padding: 16, flexGrow: 1 },
  input: {
    fontSize: 16,
    textAlignVertical: 'top',
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    height: 150,
  },
  searchInput: {
    fontSize: 16,
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
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  tagTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  tagButton: {
    backgroundColor: '#f0f0f0',
    padding: 8,
    margin: 5,
    borderRadius: 5,
  },
  selectedTagButton: {
    backgroundColor: '#6C63FF',
  },
  tagText: {
    fontSize: 14,
    color: '#333',
  },
  imageButton: {
    backgroundColor: '#6C63FF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  imageButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  imagePreview: {
    width: 200,
    height: 200,
    marginBottom: 10,
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
  entryImage: {
    width: 200,
    height: 200,
    marginTop: 10,
  },
  entryMood: {
    marginTop: 10,
    fontSize: 14,
    color: '#888',
  },
  entryTags: {
    marginTop: 5,
    fontSize: 14,
    color: '#888',
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
