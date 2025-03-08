import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput, Snackbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { signUp } from '../config/firebase';

export default function RegisterScreen() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [visible, setVisible] = useState(false);

  const handleRegister = async () => {
    if (!firstName || !lastName || !email || !password) {
      setError('Please fill in all fields');
      setVisible(true);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setVisible(true);
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      setVisible(true);
      return;
    }

    setLoading(true);
    try {
      console.log("Creating user with data:", { firstName, lastName, email });
      
      // Create user with additional profile data
      const userData = {
        firstName,
        lastName,
        email,
        createdAt: new Date(),
        stats: {
          caloriesIntake: 78,
          walking: 10,
          sleep: 8
        }
      };
      
      // Log before signup attempt
      console.log("Attempting to sign up user...");
      
      const userCredential = await signUp(email, password, userData);
      console.log("User created successfully:", userCredential.user.uid);
      
      // Navigate to home screen after successful registration
      router.replace('/home');
    } catch (error: any) {
      console.error('Registration error details:', error);
      setError(error.message);
      setVisible(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text variant="headlineLarge" style={styles.title}>Register</Text>
        
        <View style={styles.form}>
          <View style={styles.nameContainer}>
            <View style={styles.nameField}>
              <Text style={styles.label}>First Name</Text>
              <TextInput
                mode="outlined"
                placeholder="John"
                value={firstName}
                onChangeText={setFirstName}
                style={styles.input}
                outlineStyle={styles.inputOutline}
              />
            </View>
            
            <View style={styles.nameField}>
              <Text style={styles.label}>Last Name</Text>
              <TextInput
                mode="outlined"
                placeholder="Doe"
                value={lastName}
                onChangeText={setLastName}
                style={styles.input}
                outlineStyle={styles.inputOutline}
              />
            </View>
          </View>
          
          <Text style={[styles.label, styles.spacedLabel]}>E-mail</Text>
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
            placeholder="••••••••"
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
          <Text style={styles.passwordHint}>must contain 8 char.</Text>
          
          <Text style={[styles.label, styles.spacedLabel]}>Confirm Password</Text>
          <TextInput
            mode="outlined"
            placeholder="••••••••"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!confirmPasswordVisible}
            right={
              <TextInput.Icon 
                icon={confirmPasswordVisible ? "eye-off" : "eye"} 
                onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
              />
            }
            style={styles.input}
            outlineStyle={styles.inputOutline}
          />
          
          <Button 
            mode="contained" 
            onPress={handleRegister}
            style={styles.registerButton}
            labelStyle={styles.registerButtonLabel}
            loading={loading}
          >
            Create Account
          </Button>
          
          <View style={styles.termsContainer}>
            <Text style={styles.termsText}>
              By continuing, you agree to our{' '}
              <Link href="/terms" style={styles.linkText}>Terms of Service</Link> and{' '}
              <Link href="/privacy" style={styles.linkText}>Privacy Policy</Link>.
            </Text>
          </View>
        </View>
      </View>
      
      <Snackbar
        visible={!!error}
        onDismiss={() => setError('')}
        action={{
          label: 'Close',
          onPress: () => setError(''),
        }}>
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
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nameField: {
    width: '48%',
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
  passwordHint: {
    fontSize: 12,
    color: '#666',
    marginTop: -4,
  },
  registerButton: {
    backgroundColor: '#0A2540',
    borderRadius: 8,
    padding: 4,
    marginTop: 24,
    marginBottom: 16,
  },
  registerButtonLabel: {
    fontSize: 16,
    color: '#fff',
  },
  termsContainer: {
    marginTop: 8,
  },
  termsText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  linkText: {
    color: '#0A2540',
    textDecorationLine: 'underline',
  },
}); 