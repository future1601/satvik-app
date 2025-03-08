import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { PaperProvider, MD3LightTheme } from 'react-native-paper';
import { auth, initializeDatabase } from '../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { User } from 'firebase/auth';

// Import the global CSS (this is all we need for NativeWind)
import "../global.css";

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Create a custom theme for Paper
const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#0A2540', // Dark blue from your design
    secondary: '#4CAF50', // Green for balance theme
  },
};

export default function RootLayout() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const colorScheme = useColorScheme();

  useEffect(() => {
    // Initialize the database
    initializeDatabase().then(success => {
      if (success) {
        console.log("Database ready for use");
      }
    });

    // Use onAuthStateChanged directly from firebase/auth
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Auth state changed:", currentUser ? "User logged in" : "No user");
      setUser(currentUser);
      if (initializing) setInitializing(false);
      
      // Navigate based on auth state
      if (currentUser) {
        router.replace('/home');
      } else {
        router.replace('/welcome');
      }
    });

    return unsubscribe; // unsubscribe on unmount
  }, [initializing]);

  const [loaded, error] = useFonts({
    // Add your custom fonts here
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <PaperProvider theme={theme}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }} />
      </ThemeProvider>
    </PaperProvider>
  );
}
