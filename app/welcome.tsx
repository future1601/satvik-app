import { Image, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, Stack } from 'expo-router';
import { signInWithGoogle } from '../config/firebase';

export default function WelcomeScreen() {
  const handleRegister = () => {
    router.push('/register');
  };

  const handleLogin = () => {
    router.push('/login');
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      router.replace('/home');
    } catch (error: any) {
      console.error('Google login error:', error.message);
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.imageWrapper}>
            <Image 
              source={require('@/assets/images/welcome-illustration.png')} 
              style={styles.illustration}
              resizeMode="contain"
            />
          </View>
          
          <View style={styles.footer}>
            <Text style={styles.title}>Satvik</Text>
            <Text style={styles.subtitle}>Where Nutrition Meets Balance.</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <View style={styles.buttonRow}>
            <Button 
              mode="outlined" 
              onPress={handleRegister}
              style={styles.registerButton}
              labelStyle={styles.registerButtonLabel}
              contentStyle={styles.buttonContent}
            >
              Register
            </Button>
            
            <Button 
              mode="contained" 
              onPress={handleLogin}
              style={styles.loginButton}
              labelStyle={styles.loginButtonLabel}
              contentStyle={styles.buttonContent}
            >
              Login
            </Button>
          </View>
          
          <Button 
            icon="google" 
            mode="outlined" 
            onPress={handleGoogleLogin}
            style={styles.googleButton}
            labelStyle={styles.googleButtonLabel}
            contentStyle={styles.buttonContent}
          >
            Login with Google
          </Button>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageWrapper: {
    width: '100%',
    height: '40%',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustration: {
    width: '100%',
    height: '100%',
  },
  footer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0A2540',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  buttonContainer: {
    padding: 24,
  },
  buttonRow: {
    flexDirection: 'row',
    width: '100%',
    gap: 12,
    marginBottom: 12,
  },
  buttonContent: {
    height: 48,
  },
  registerButton: {
    flex: 1,
    borderColor: '#0A2540',
    borderRadius: 24,
    borderWidth: 1,
  },
  registerButtonLabel: {
    fontSize: 16,
    color: '#0A2540',
  },
  loginButton: {
    flex: 1,
    backgroundColor: '#0A2540',
    borderRadius: 24,
  },
  loginButtonLabel: {
    fontSize: 16,
    color: '#fff',
  },
  googleButton: {
    width: '100%',
    borderRadius: 24,
    borderColor: '#E0E0E0',
  },
  googleButtonLabel: {
    fontSize: 16,
    color: '#666',
  },
}); 