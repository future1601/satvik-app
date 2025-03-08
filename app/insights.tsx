import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { NavigationProp } from '@react-navigation/native'; // Import NavigationProp

const Insights = ({ navigation }: { navigation: NavigationProp<any> }) => { // Define navigation type
  const [selectedDate, setSelectedDate] = useState(15);

  // Calendar dates
  const dates = [13, 14, 15, 16, 17, 18, 19];
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  
  const renderCalendar = () => {
    return (
      <View style={styles.calendarContainer}>
        <View style={styles.daysRow}>
          {days.map((day, index) => (
            <View key={`day-${index}`} style={styles.dayCell}>
              <Text style={styles.dayText}>{day}</Text>
            </View>
          ))}
        </View>
        <View style={styles.datesRow}>
          {dates.map((date) => (
            <TouchableOpacity
              key={`date-${date}`}
              style={[
                styles.dateCell,
                selectedDate === date && styles.selectedDateCell,
              ]}
              onPress={() => setSelectedDate(date)}
            >
              <Text
                style={[
                  styles.dateText,
                  selectedDate === date && styles.selectedDateText,
                ]}
              >
                {date}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  const renderMealCard = (mealType: string, mealName: string, calories: string, portion: string) => {
    return (
      <View style={styles.mealCard}>
        <View style={styles.mealHeading}>
          <Text style={styles.mealTypeText}>{mealType}</Text>
          {/* Removed the calories text from here */}
        </View>
        
        <View style={styles.mealDetailsContainer}>
          <View style={styles.mealImageContainer}>
            <Image
              source={require('@/assets/images/salad 1.png')}
              style={styles.mealImage}
            />
          </View>
          
          <View style={styles.mealInfoContainer}>
            <Text style={styles.mealNameText}>{mealName}</Text>
            <Text style={styles.portionText}>{portion} Portion</Text>
            
            <View style={styles.nutritionContainer}>
              <View style={styles.nutritionItem}>
                <View style={[styles.nutritionDot, { backgroundColor: '#8A70D6' }]} />
                <Text style={styles.nutritionText}>8% carbs</Text>
              </View>
              
              <View style={styles.nutritionItem}>
                <View style={[styles.nutritionDot, { backgroundColor: '#F5A65B' }]} />
                <Text style={styles.nutritionText}>16% protein</Text>
              </View>
              
              <View style={styles.nutritionItem}>
                <View style={[styles.nutritionDot, { backgroundColor: '#E17E7E' }]} />
                <Text style={styles.nutritionText}>6% Fat</Text>
              </View>
            </View>
            
            <View style={styles.nutritionBars}>
              <View style={[styles.nutritionBar, { backgroundColor: '#8A70D6', flex: 0.08 }]} />
              <View style={[styles.nutritionBar, { backgroundColor: '#F5A65B', flex: 0.16 }]} />
              <View style={[styles.nutritionBar, { backgroundColor: '#E17E7E', flex: 0.06 }]} />
              <View style={[styles.nutritionBar, { backgroundColor: '#E8E8E8', flex: 0.7 }]} />
            </View>
          </View>
        </View>
        
        <TouchableOpacity style={styles.addButton} onPress={() => console.log('Add button pressed')}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Insights</Text>
        <Text style={styles.headerDate}>June 2022</Text>
      </View>

      {renderCalendar()}

      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.mealCardsContainer}>
          {renderMealCard('Breakfast', 'salad', '427', '1')}
          {renderMealCard('Lunch', 'Paneer Masala', '427', '1')}
          {renderMealCard('Dinner', 'Butter Chicken', '427', '1')} // Updated meal name
        </View>
      </ScrollView>

      <View style={styles.bottomNavContainer}>
        <TouchableOpacity style={styles.navItem}>
          <Image
            source={require('@/assets/images/grid-icon.png')}
            style={styles.navIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Image
            source={require('@/assets/images/chart-icon.png')}
            style={styles.navIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItemCenter}>
          <View style={styles.navCenterButton}>
            <Text style={styles.navCenterButtonText}>+</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => {
            if (navigation && navigation.navigate) {
              navigation.navigate('Insights');
            }
          }} // Ensure navigation is defined
        >
          <Image
            source={require('@/assets/images/heart-icon.png')}
            style={styles.navIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Image
            source={require('@/assets/images/chart-icon.png')}
            style={styles.navIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 5,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '600',
    color: '#000000',
  },
  headerDate: {
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
  },
  calendarContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  dayCell: {
    width: 40,
    alignItems: 'center',
  },
  dayText: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  datesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateCell: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedDateCell: {
    backgroundColor: '#252A40',
  },
  dateText: {
    fontSize: 16,
    color: '#000000',
  },
  selectedDateText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  mealCardsContainer: {
    padding: 20,
  },
  mealCard: {
    backgroundColor: '#252A40',
    borderRadius: 20,
    padding: 20,
    position: 'relative',
    marginBottom: 20,
  },
  mealHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  mealTypeText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
  },
  caloriesText: {
    color: '#FFFFFF',
    fontSize: 14,
    opacity: 0.8,
  },
  mealDetailsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  mealImageContainer: {
    marginRight: 20,
  },
  mealImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
  },
  mealInfoContainer: {
    flex: 1,
  },
  mealNameText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  portionText: {
    color: '#FFFFFF',
    fontSize: 14,
    opacity: 0.8,
    marginBottom: 12,
  },
  nutritionContainer: {
    flexDirection: 'row',
    marginBottom: 8,
    gap: 16,
  },
  nutritionItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nutritionDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  nutritionText: {
    color: '#FFFFFF',
    fontSize: 12,
    opacity: 0.8,
  },
  nutritionBars: {
    flexDirection: 'row',
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  nutritionBar: {
    height: '100%',
  },
  addButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    fontSize: 24,
    color: '#252A40',
    lineHeight: 28,
    fontWeight: '300',
  },
  bottomNavContainer: {
    flexDirection: 'row',
    height: 80,
    backgroundColor: '#E6F2FA',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingBottom: 20,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navItemCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -30,
  },
  navCenterButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#252A40',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  navCenterButtonText: {
    fontSize: 32,
    color: '#FFFFFF',
    fontWeight: '300',
  },
  navIcon: {
    width: 24,
    height: 24,
    tintColor: '#252A40',
  },
});

export default Insights;