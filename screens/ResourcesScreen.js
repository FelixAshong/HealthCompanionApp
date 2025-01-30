import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, ScrollView, Animated, Image } from 'react-native';
import { WebView } from 'react-native-webview';
import Icon from 'react-native-vector-icons/FontAwesome';

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

const specialists = [
  {
    name: 'Dr. Kwame Nkrumah',
    specialty: 'Psychiatrist',
    contact: 'tel:0541234567',
    email: 'dr.kwamenkrumah@example.com',
  },
  {
    name: 'Dr. Ama Serwah',
    specialty: 'Therapist',
    contact: 'tel:0207654321',
    email: 'dr.amaserwah@example.com',
  },
  {
    name: 'Dr. Kofi Mensah',
    specialty: 'Psychologist',
    contact: 'tel:0242345678',
    email: 'dr.kofimensah@example.com',
  },
];

export default function ResourcesScreen() {
  const [fadeInValue, setFadeInValue] = useState(new Animated.Value(0)); // For fade-in effect
  const [mapVisible, setMapVisible] = useState(false); // For map visibility animation

  useEffect(() => {
    // Fade-in effect when the component is loaded
    Animated.timing(fadeInValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Show map after 2 seconds with fade-in
    setTimeout(() => {
      setMapVisible(true);
    }, 2000);
  }, []);

  const handlePress = (link) => {
    Linking.openURL(link);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Animated.Text style={[styles.title, { opacity: fadeInValue }]}>
          Mental Health Resources
        </Animated.Text>

        {/* Resources */}
        {resources.map((resource, index) => (
          <TouchableOpacity
            key={index}
            style={styles.resourceCard}
            onPress={() => handlePress(resource.link)}
          >
            <View style={styles.iconContainer}>
              <Icon name="phone" size={30} color="#4CAF50" />
            </View>
            <Text style={styles.resourceTitle}>{resource.title}</Text>
            <Text style={styles.resourceDescription}>{resource.description}</Text>
          </TouchableOpacity>
        ))}

        {/* Medical Specialists Contact Cards */}
        <Animated.Text style={[styles.sectionTitle, { opacity: fadeInValue }]}>
          Medical Specialists
        </Animated.Text>
        {specialists.map((specialist, index) => (
          <View key={index} style={styles.resourceCard}>
            <Image
              source={{ uri: 'https://via.placeholder.com/100' }} // Placeholder image
              style={styles.profileImage}
            />
            <Text style={styles.resourceTitle}>{specialist.name}</Text>
            <Text style={styles.resourceDescription}>{specialist.specialty}</Text>
            <Text
              style={styles.contact}
              onPress={() => handlePress(specialist.contact)}
            >
              Contact: {specialist.contact}
            </Text>
            <Text
              style={styles.contact}
              onPress={() => handlePress(`mailto:${specialist.email}`)}
            >
              Email: {specialist.email}
            </Text>
          </View>
        ))}

        {/* Map Location of Ghana */}
        <Animated.View
          style={[styles.mapContainer, { opacity: mapVisible ? 1 : 0, height: mapVisible ? 300 : 0 }]}
        >
          <WebView
            originWhitelist={['*']}
            source={{
              uri: 'https://www.google.com/maps/embed/v1/place?q=Ghana&key=YOUR_GOOGLE_MAPS_API_KEY',
            }}
            style={styles.map}
            javaScriptEnabled={true}
            domStorageEnabled={true}
          />
        </Animated.View>

        {/* Social Media Handles */}
        <Text style={styles.sectionTitle}>Follow Us On Social Media</Text>
        <View style={styles.resourceCard}>
          <Icon name="facebook" size={30} color="#3b5998" />
          <Text
            style={styles.socialLink}
            onPress={() => handlePress('https://facebook.com/yourpage')}
          >
            https://facebook.com/yourpage
          </Text>
          <Icon name="twitter" size={30} color="#1DA1F2" />
          <Text
            style={styles.socialLink}
            onPress={() => handlePress('https://twitter.com/yourhandle')}
          >
            https://twitter.com/yourhandle
          </Text>
          <Icon name="instagram" size={30} color="#E4405F" />
          <Text
            style={styles.socialLink}
            onPress={() => handlePress('https://instagram.com/yourprofile')}
          >
            https://instagram.com/yourprofile
          </Text>
        </View>

        {/* Emergency Contacts in Ghana */}
        <Text style={styles.sectionTitle}>Emergency Contacts in Ghana</Text>
        <View style={styles.resourceCard}>
          <Text style={styles.resourceTitle}>Ambulance</Text>
          <Text
            style={styles.contact}
            onPress={() => handlePress('tel:193')}
          >
            Call: 193
          </Text>
          <Text style={styles.resourceTitle}>Police</Text>
          <Text
            style={styles.contact}
            onPress={() => handlePress('tel:191')}
          >
            Call: 191
          </Text>
          <Text style={styles.resourceTitle}>Fire Service</Text>
          <Text
            style={styles.contact}
            onPress={() => handlePress('tel:192')}
          >
            Call: 192
          </Text>
        </View>

        {/* Author Information */}
        <View style={styles.authorContainer}>
          <Text style={styles.authorText}>Author: Phleodelly</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  container: { flex: 1, padding: 16, backgroundColor: '#F3F4F6' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#4CAF50' },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#333',
  },
  resourceCard: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  resourceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  resourceDescription: {
    fontSize: 14,
    color: '#666666',
    marginTop: 5,
  },
  contact: {
    fontSize: 14,
    color: '#4CAF50',
    marginTop: 5,
    textDecorationLine: 'underline',
  },
  socialLink: {
    fontSize: 14,
    color: '#1E90FF',
    marginTop: 5,
    textDecorationLine: 'underline',
  },
  mapContainer: {
    marginBottom: 20,
    overflow: 'hidden',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    alignSelf: 'center',
  },
  iconContainer: {
    alignSelf: 'flex-start',
    marginRight: 10,
  },
  authorContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  authorText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#888',
  },
});
