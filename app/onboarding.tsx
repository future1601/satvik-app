import { useState, useRef } from 'react';
import { StyleSheet, View, Image, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

// Onboarding data
const onboardingData = [
  {
    id: '1',
    title: 'Smarter Choices,\nHealthier You',
    description: 'Scan barcodes to get personalized health ratings, discover better alternatives, and track your nutrient intake effectively',
    image: require('@/assets/images/onboarding-1.png'),
  },
  {
    id: '2',
    title: 'Accessible Tools\nfor Everyone',
    description: 'Join eating groups, access mentorship, and collaborate with others. Gain financial knowledge through interactive lessons',
    image: require('@/assets/images/onboarding-2.png'),
  },
  {
    id: '3',
    title: 'Stay on Track,\nEvery Step',
    description: 'Sync with wearables, analyze progress, and receive AI-powered suggestions to balance your diet and achieve your goals',
    image: require('@/assets/images/onboarding-3.png'),
  },
];

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      // Navigate to welcome screen when finished
      router.replace('/welcome');
    }
  };

  const handleSkip = () => {
    // Skip to welcome screen
    router.replace('/welcome');
  };

  const renderItem = ({ item, index }: { item: typeof onboardingData[0], index: number }) => {
    return (
      <View style={styles.slide}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Satvik</Text>
        </View>
        
        <Image 
          source={item.image} 
          style={styles.image}
          resizeMode="contain"
        />
        
        <View style={styles.pagination}>
          {onboardingData.map((_, i) => (
            <View 
              key={i} 
              style={[
                styles.paginationDot, 
                i === index ? styles.paginationDotActive : {}
              ]} 
            />
          ))}
        </View>
        
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleSkip}>
            <Text style={styles.skipButton}>Skip</Text>
          </TouchableOpacity>
          
          <Button 
            mode="contained" 
            onPress={handleNext}
            style={styles.nextButton}
            labelStyle={styles.nextButtonLabel}
          >
            Next
          </Button>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={onboardingData}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0A2540',
    textAlign: 'center',
  },
  slide: {
    width,
    padding: 24,
    alignItems: 'center',
  },
  image: {
    width: width * 0.8,
    height: width * 0.8,
    marginBottom: 24,
  },
  pagination: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: '#4CAF50',
    width: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0A2540',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 48,
    lineHeight: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  skipButton: {
    fontSize: 16,
    color: '#4CAF50',
  },
  nextButton: {
    backgroundColor: '#0A2540',
    borderRadius: 8,
    paddingHorizontal: 24,
  },
  nextButtonLabel: {
    fontSize: 16,
    color: '#fff',
  },
}); 