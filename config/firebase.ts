import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithCredential
} from 'firebase/auth';
import { getAnalytics, isSupported } from 'firebase/analytics';
import Constants from 'expo-constants';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { Platform } from 'react-native';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc,
  collection,
  query,
  where,
  getDocs
} from 'firebase/firestore';
//import { GoogleSignin } from '@react-native-google-signin/google-signin';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: Constants.expoConfig?.extra?.firebaseApiKey,
  authDomain: Constants.expoConfig?.extra?.firebaseAuthDomain,
  projectId: Constants.expoConfig?.extra?.firebaseProjectId,
  storageBucket: Constants.expoConfig?.extra?.firebaseStorageBucket,
  messagingSenderId: Constants.expoConfig?.extra?.firebaseMessagingSenderId,
  appId: Constants.expoConfig?.extra?.firebaseAppId,
  measurementId: Constants.expoConfig?.extra?.firebaseMeasurementId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Firebase Analytics if supported
let analytics = null;
isSupported().then(yes => yes && (analytics = getAnalytics(app)));

// Initialize Google Sign-In
//GoogleSignin.configure({
//  webClientId: 'YOUR_WEB_CLIENT_ID', // Get this from Firebase Console
//});

// Initialize WebBrowser for Google Auth
WebBrowser.maybeCompleteAuthSession();

// For native platforms
export const useGoogleAuth = () => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: Constants.expoConfig?.extra?.googleExpoClientId,
    iosClientId: Constants.expoConfig?.extra?.googleIosClientId,
    androidClientId: Constants.expoConfig?.extra?.googleAndroidClientId,
    webClientId: Constants.expoConfig?.extra?.googleWebClientId,
  });

  return { request, response, promptAsync };
};

export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const signUp = async (email: string, password: string, userData: any) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await createUserProfile(userCredential.user.uid, userData);
    return userCredential;
  } catch (error) {
    throw error;
  }
};

export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    throw error;
  }
};

// For web and native platforms
export const signInWithGoogle = async (idToken?: string) => {
  try {
    if (Platform.OS === 'web') {
      // Web implementation
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      await createUserProfile(result.user.uid, {
        firstName: result.user.displayName?.split(' ')[0] || '',
        lastName: result.user.displayName?.split(' ').slice(1).join(' ') || '',
        email: result.user.email,
        photoURL: result.user.photoURL
      });
      return result;
    } else {
      // Native implementation requires idToken from expo-auth-session
      if (!idToken) {
        throw new Error('ID token is required for native Google sign-in');
      }
      
      const credential = GoogleAuthProvider.credential(idToken);
      const result = await signInWithCredential(auth, credential);
      await createUserProfile(result.user.uid, {
        firstName: result.user.displayName?.split(' ')[0] || '',
        lastName: result.user.displayName?.split(' ').slice(1).join(' ') || '',
        email: result.user.email,
        photoURL: result.user.photoURL
      });
      return result;
    }
  } catch (error) {
    throw error;
  }
};

// Create user profile in Firestore
const createUserProfile = async (userId: string, userData: any) => {
  const userRef = doc(db, 'users', userId);
  
  // Add default fields along with provided data
  const userProfile = {
    createdAt: new Date(),
    ...userData
  };
  
  return setDoc(userRef, userProfile);
};

// Get user profile from Firestore
const getUserProfile = async (userId: string) => {
  const userRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userRef);
  
  if (userSnap.exists()) {
    return userSnap.data();
  } else {
    return null;
  }
};

// Update user profile in Firestore
const updateUserProfile = async (userId: string, data: any) => {
  const userRef = doc(db, 'users', userId);
  return updateDoc(userRef, data);
};

// Add this function to your firebase.ts file
const initializeDatabase = async () => {
  try {
    // Create a test user document to ensure the collection exists
    const testRef = doc(collection(db, 'users'), 'test');
    await setDoc(testRef, {
      initialized: true,
      timestamp: new Date()
    });
    console.log("Database initialized successfully");
    return true;
  } catch (error) {
    console.error("Error initializing database:", error);
    return false;
  }
};

export { auth, onAuthStateChanged, analytics, db, initializeDatabase }; 