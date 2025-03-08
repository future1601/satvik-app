import { Image, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';

export default function WelcomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image 
          source={require('@/assets/images/welcome-illustration.png')} 
          style={styles.illustration}
          resizeMode="contain"
        />
        
        <Text variant="headlineMedium" style={styles.title}>Satvik</Text>
        <Text variant="bodyMedium" style={styles.subtitle}>Where Life Meets Balance.</Text>
        
        <Link href="/onboarding" asChild>
          <Button 
            mode="contained" 
            style={styles.getStartedButton}
            labelStyle={styles.getStartedButtonLabel}
          >
            Get Started
          </Button>
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustration: {
    width: '100%',
    height: 240,
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0A2540',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
    marginBottom: 48,
    textAlign: 'center',
  },
  getStartedButton: {
    width: '100%',
    backgroundColor: '#0A2540',
    borderRadius: 8,
    padding: 4,
  },
  getStartedButtonLabel: {
    fontSize: 16,
    color: '#fff',
  },
}); 