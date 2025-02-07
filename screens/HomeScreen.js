import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Linking,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel'; // Only this import
import AppHeader from '../components/AppHeader'; // Import AppHeader component

const { width: screenWidth } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef(null);

  // Slideshow images
  const slides = [
    require('../assets/slide1.jpg'), // Replace with your images
    require('../assets/slide2.jpg'),
    require('../assets/slide3.jpg'),
  ];

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        const nextSlide = (activeSlide + 1) % slides.length;
        carouselRef.current.scrollTo({ index: nextSlide, animated: true });
        setActiveSlide(nextSlide);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [activeSlide]);

  // Render each slide
  const renderSlide = ({ item, index }) => (
    <View style={styles.slide}>
      <Image source={item} style={styles.slideImage} />
    </View>
  );

  // Mental health specialists data
  const specialists = [
    {
      name: 'Dr. Daniel G. Amen',
      description:
        'A renowned psychiatrist and brain health specialist, Dr. Amen is known for his work on SPECT imaging and mental health.',
      contact: 'Website: amenclinics.com',
      link: 'https://www.amenclinics.com',
    },
    {
      name: 'Dr. Brene Brown',
      description:
        'A research professor and expert on vulnerability, courage, and empathy. Her work has revolutionized mental health discussions.',
      contact: 'Website: brenebrown.com',
      link: 'https://brenebrown.com',
    },
    {
      name: 'Dr. Gabor Maté',
      description:
        'A physician and author specializing in trauma, addiction, and mental health. His holistic approach has helped many.',
      contact: 'Website: drgabormate.com',
      link: 'https://drgabormate.com',
    },
  ];

  // Open specialist's website
  const handleContactPress = (link) => {
    Linking.openURL(link).catch((err) =>
      console.error('Failed to open URL:', err)
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header Section */}
      <AppHeader navigation={navigation} /> {/* Add AppHeader at the top */}

      {/* Welcome Section */}
      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeTitle}>Welcome to Your Mental Health Companion</Text>
        <Text style={styles.welcomeText}>
          Your journey to better mental health starts here. Track your mood, journal your thoughts,
          practice mindfulness, and discover resources to support your well-being.
        </Text>
      </View>

      {/* Slideshow Section */}
      <View style={styles.slideshowSection}>
        <Carousel
          ref={carouselRef}
          data={slides}
          renderItem={renderSlide}
          width={screenWidth}
          height={200}
          autoPlay={true}
          autoPlayInterval={5000}
          loop={true}
          onSnapToItem={(index) => setActiveSlide(index)}
        />
        <View style={styles.pagination}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                index === activeSlide && styles.paginationDotActive,
              ]}
            />
          ))}
        </View>
      </View>

      {/* Mental Health Specialists Section */}
      <View style={styles.specialistsSection}>
        <Text style={styles.sectionTitle}>Famous Mental Health Specialists</Text>
        {specialists.map((specialist, index) => (
          <TouchableOpacity
            key={index}
            style={styles.specialistCard}
            onPress={() => handleContactPress(specialist.link)}
          >
            <View style={styles.specialistIconContainer}>
              <Text style={styles.specialistIcon}>👨‍⚕️</Text>
            </View>
            <View style={styles.specialistTextContainer}>
              <Text style={styles.specialistName}>{specialist.name}</Text>
              <Text style={styles.specialistDescription}>{specialist.description}</Text>
              <Text style={styles.specialistContact}>{specialist.contact}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Call-to-Action Section */}
      <View style={styles.ctaSection}>
        <Text style={styles.ctaText}>Ready to Get Started?</Text>
        <TouchableOpacity
          style={styles.ctaButton}
          onPress={() => navigation.navigate('MoodTracker')}
        >
          <Text style={styles.ctaButtonText}>Track Your Mood</Text>
        </TouchableOpacity>
      </View>

      {/* Footer Section */}
      <View style={styles.footerSection}>
        <Text style={styles.footerText}>
          Your mental health matters. Take small steps every day to nurture your well-being.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  welcomeSection: {
    marginBottom: 30,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 24,
  },
  slideshowSection: {
    marginBottom: 30,
  },
  slide: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  slideImage: {
    width: '92%',
    height: 200,
    borderRadius: 10,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#CCCCCC',
    marginHorizontal: 5,
  },
  paginationDotActive: {
    backgroundColor: '#6C63FF',
  },
  specialistsSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 20,
  },
  specialistCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  specialistIconContainer: {
    backgroundColor: '#6C63FF',
    borderRadius: 10,
    padding: 10,
    marginRight: 15,
  },
  specialistIcon: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  specialistTextContainer: {
    flex: 1,
  },
  specialistName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
  },
  specialistDescription: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
    marginBottom: 5,
  },
  specialistContact: {
    fontSize: 14,
    color: '#6C63FF',
    fontWeight: 'bold',
  },
  ctaSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  ctaText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 15,
  },
  ctaButton: {
    backgroundColor: '#6C63FF',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  ctaButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footerSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  footerText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 20,
  },
});
