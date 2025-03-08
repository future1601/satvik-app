import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { TextInput, Button, Text, RadioButton } from 'react-native-paper';
import { collection, doc, addDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { router, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AddMealScreen() {
  const [mealType, setMealType] = useState('b');
  const [name, setName] = useState('');
  const [protein, setProtein] = useState('');
  const [calorie, setCalorie] = useState('');
  const [fats, setFats] = useState('');
  const [carb, setCarb] = useState('');
  const [loading, setLoading] = useState(false);

  const saveMeal = async () => {
    // Validate inputs
    if (!name || !protein || !calorie || !fats || !carb) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      Alert.alert('Error', 'You must be logged in to add a meal');
      return;
    }

    try {
      setLoading(true);
      
      // Create meal data object
      const mealData = {
        meal: mealType,
        name,
        protein: Number(protein),
        calorie: Number(calorie),
        fats: Number(fats),
        carb: Number(carb),
        createdAt: new Date()
      };

      // Get reference to the user's dailyMeals collection
      const dailyMealsRef = collection(doc(db, "users", user.uid), "dailyMeals");
      
      // Add the document
      const docRef = await addDoc(dailyMealsRef, mealData);
      
      // Success message
      Alert.alert('Success', `Added ${name} to your meals!`);
      
      // Reset form
      setName('');
      setProtein('');
      setCalorie('');
      setFats('');
      setCarb('');
      
      // Navigate back
      router.back();
    } catch (error) {
      console.error('Error adding meal:', error);
      Alert.alert('Error', 'Failed to add meal. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: "Add Meal" }} />
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.title}>Add New Meal</Text>
          
          <View style={styles.radioContainer}>
            <Text>Meal Type:</Text>
            <RadioButton.Group onValueChange={value => setMealType(value)} value={mealType}>
              <View style={styles.radioRow}>
                <RadioButton.Item label="Breakfast" value="b" />
                <RadioButton.Item label="Lunch" value="l" />
                <RadioButton.Item label="Dinner" value="d" />
              </View>
            </RadioButton.Group>
          </View>
          
          <TextInput
            label="Meal Name"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
          
          <TextInput
            label="Protein (g)"
            value={protein}
            onChangeText={setProtein}
            keyboardType="numeric"
            style={styles.input}
          />
          
          <TextInput
            label="Calories"
            value={calorie}
            onChangeText={setCalorie}
            keyboardType="numeric"
            style={styles.input}
          />
          
          <TextInput
            label="Fats (g)"
            value={fats}
            onChangeText={setFats}
            keyboardType="numeric"
            style={styles.input}
          />
          
          <TextInput
            label="Carbs (g)"
            value={carb}
            onChangeText={setCarb}
            keyboardType="numeric"
            style={styles.input}
          />
          
          <Button 
            mode="contained" 
            onPress={saveMeal} 
            loading={loading}
            style={styles.button}
          >
            Save Meal
          </Button>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 12,
  },
  radioContainer: {
    marginBottom: 16,
  },
  radioRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    marginTop: 16,
    marginBottom: 32,
  }
});
