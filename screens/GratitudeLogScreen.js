import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Alert,
  Keyboard,
  ScrollView,
} from 'react-native';
import { AppContext } from '../context/AppContext';
import { BarChart, PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default function GratitudeLogScreen() {
  const { gratitudeEntries, setGratitudeEntries } = useContext(AppContext);
  const [entry, setEntry] = useState('');
  const [characterCount, setCharacterCount] = useState(0);
  const [tags, setTags] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const maxCharacterLimit = 500;

  const saveGratitudeEntry = () => {
    if (entry.trim()) {
      const newEntry = { date: new Date().toISOString(), text: entry, tags };
      if (editingIndex !== null) {
        const updatedEntries = [...gratitudeEntries];
        updatedEntries[editingIndex] = newEntry;
        setGratitudeEntries(updatedEntries);
        setEditingIndex(null);
      } else {
        setGratitudeEntries([...gratitudeEntries, newEntry]);
      }
      setEntry('');
      setTags([]);
      setCharacterCount(0);
      Keyboard.dismiss();
    } else {
      alert('Please write something before saving.');
    }
  };

  const deleteEntry = (index) => {
    Alert.alert(
      'Delete Entry',
      'Are you sure you want to delete this entry?',
      [
        { text: 'Cancel' },
        { text: 'Yes', onPress: () => removeEntry(index) },
      ]
    );
  };

  const removeEntry = (index) => {
    const updatedEntries = gratitudeEntries.filter((_, i) => i !== index);
    setGratitudeEntries(updatedEntries);
  };

  const editEntry = (index) => {
    const entryToEdit = gratitudeEntries[index];
    setEntry(entryToEdit.text);
    setTags(entryToEdit.tags);
    setEditingIndex(index);
  };

  const handleTagChange = (tag) => {
    if (tags.includes(tag)) {
      setTags(tags.filter((t) => t !== tag));
    } else {
      setTags([...tags, tag]);
    }
  };

  const renderGratitudeEntry = ({ item, index }) => (
    <View style={styles.entry}>
      <Text style={styles.date}>{new Date(item.date).toLocaleDateString()}</Text>
      <Text style={styles.text}>{item.text}</Text>
      {item.tags.length > 0 && (
        <Text style={styles.tags}>Tags: {item.tags.join(', ')}</Text>
      )}
      <View style={styles.entryActions}>
        <TouchableOpacity onPress={() => editEntry(index)} style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteEntry(index)} style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const filterEntriesByDate = () => {
    return gratitudeEntries.filter((entry) =>
      entry.date.includes(selectedDate)
    );
  };

  const gratitudeData = gratitudeEntries.length;
  const tagsData = tags.length;

  const filteredEntries = selectedDate ? filterEntriesByDate() : gratitudeEntries;

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Gratitude Log</Text>
        
        {/* Gratitude Entry Input */}
        <TextInput
          style={styles.input}
          placeholder="What are you grateful for today?"
          value={entry}
          onChangeText={(text) => {
            setEntry(text);
            setCharacterCount(text.length);
          }}
          multiline
          maxLength={maxCharacterLimit}
        />
        <Text style={styles.characterCount}>
          {characterCount}/{maxCharacterLimit} characters
        </Text>

        {/* Tags */}
        <View style={styles.tagContainer}>
          <Text style={styles.tagTitle}>Tags:</Text>
          {['Family', 'Health', 'Work', 'Friends', 'Nature'].map((tag) => (
            <TouchableOpacity
              key={tag}
              onPress={() => handleTagChange(tag)}
              style={[
                styles.tagButton,
                tags.includes(tag) && styles.selectedTagButton,
              ]}
            >
              <Text style={styles.tagText}>{tag}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.button} onPress={saveGratitudeEntry}>
          <Text style={styles.buttonText}>
            {editingIndex !== null ? 'Update Entry' : 'Save Entry'}
          </Text>
        </TouchableOpacity>

        {/* Filter by Date */}
        <TextInput
          style={styles.input}
          placeholder="Filter by date (YYYY-MM-DD)"
          value={selectedDate}
          onChangeText={setSelectedDate}
        />

        {/* Gratitude Entries List */}
        <FlatList
          data={filteredEntries}
          renderItem={renderGratitudeEntry}
          keyExtractor={(item, index) => index.toString()}
          style={styles.entriesList}
        />

        {/* Bar Chart for Entries */}
        <Text style={styles.chartTitle}>Gratitude Entry Progress</Text>
        <BarChart
          data={{
            labels: ['Entries'],
            datasets: [
              {
                data: [gratitudeData],
              },
            ],
          }}
          width={screenWidth - 32}
          height={220}
          yAxisLabel=""
          chartConfig={{
            backgroundColor: '#6C63FF',
            backgroundGradientFrom: '#6C63FF',
            backgroundGradientTo: '#C1BFFF',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          style={styles.chart}
        />

        {/* Pie Chart for Tag Distribution */}
        <Text style={styles.chartTitle}>Tag Distribution</Text>
        <PieChart
          data={[
            {
              name: 'Tags',
              population: tagsData,
              color: '#4CAF50',
              legendFontColor: '#333',
              legendFontSize: 14,
            },
            {
              name: 'No Tags',
              population: gratitudeData - tagsData,
              color: '#FF6347',
              legendFontColor: '#333',
              legendFontSize: 14,
            },
          ]}
          width={screenWidth - 32}
          height={220}
          chartConfig={{
            backgroundGradientFrom: '#f9f9f9',
            backgroundGradientTo: '#f9f9f9',
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
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
    marginRight: 10,
  },
  tagButton: {
    backgroundColor: '#F0F0F0',
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
  button: {
    backgroundColor: '#6C63FF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: { color: '#FFFFFF', fontSize: 18 },
  entry: {
    backgroundColor: '#F9F9F9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  date: { fontSize: 14, color: '#666666', marginBottom: 5 },
  text: { fontSize: 16, color: '#333' },
  tags: { fontSize: 14, color: '#888', marginTop: 5 },
  entryActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  editButton: {
    backgroundColor: '#4CAF50',
    padding: 8,
    borderRadius: 5,
    marginRight: 10,
  },
  editButtonText: { color: '#FFFFFF', fontSize: 14 },
  deleteButton: {
    backgroundColor: '#FF6347',
    padding: 8,
    borderRadius: 5,
  },
  deleteButtonText: { color: '#FFFFFF', fontSize: 14 },
  entriesList: {
    marginTop: 20,
  },
  chart: {
    marginVertical: 10,
    borderRadius: 16,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
  },
});
