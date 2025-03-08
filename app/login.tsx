import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput, Snackbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { signIn, signInWithGoogle } from '../config/firebase';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [visible, setVisible] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please enter both email and password');
      setVisible(true);
      return;
    }

    try {
      setLoading(true);
      await signIn(email, password);
      // Navigate to home screen after successful login
      router.replace('/home');
    } catch (error: any) {
      // Show error using Snackbar
      setError(error.message || 'Login failed');
      setVisible(true);
      console.error('Login error:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      await signInWithGoogle();
      // Navigate to home screen after successful Google login
      router.replace('/home');
    } catch (error: any) {
      setError(error.message || 'Google login failed');
      setVisible(true);
      console.error('Google login error:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text variant="headlineLarge" style={styles.title}>Login</Text>
        
        <View style={styles.form}>
          <Text style={styles.label}>E-mail</Text>
          <TextInput
            mode="outlined"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
            outlineStyle={styles.inputOutline}
          />
          
          <Text style={[styles.label, styles.spacedLabel]}>Password</Text>
          <TextInput
            mode="outlined"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!passwordVisible}
            right={
              <TextInput.Icon 
                icon={passwordVisible ? "eye-off" : "eye"} 
                onPress={() => setPasswordVisible(!passwordVisible)}
              />
            }
            style={styles.input}
            outlineStyle={styles.inputOutline}
          />
          
          <Link href="/forgot-password" style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </Link>
          
          <Button 
            mode="contained" 
            onPress={handleLogin}
            style={styles.loginButton}
            labelStyle={styles.loginButtonLabel}
            loading={loading}
          >
            Login
          </Button>
          
          <Text style={styles.orText}>or login with</Text>
          
          <Button 
            icon="google" 
            mode="outlined" 
            onPress={handleGoogleLogin}
            style={styles.googleButton}
            labelStyle={styles.googleButtonLabel}
            loading={loading}
          >
            Login with Google
          </Button>
        </View>
      </View>

      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        duration={3000}
        action={{
          label: 'Close',
          onPress: () => setVisible(false),
        }}
      >
        {error}
      </Snackbar>
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
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0A2540',
    marginBottom: 32,
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  label: {
    fontSize: 16,
    color: '#0A2540',
    marginBottom: 8,
  },
  spacedLabel: {
    marginTop: 16,
  },
  input: {
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  inputOutline: {
    borderRadius: 8,
    borderColor: '#E0E0E0',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: 4,
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: '#0A2540',
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: '#0A2540',
    borderRadius: 8,
    padding: 4,
    marginBottom: 24,
  },
  loginButtonLabel: {
    fontSize: 16,
    color: '#fff',
  },
  orText: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 16,
  },
  googleButton: {
    borderColor: '#E0E0E0',
    borderRadius: 8,
  },
  googleButtonLabel: {
    color: '#666',
  },
}); 