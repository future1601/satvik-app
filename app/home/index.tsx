import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Avatar, Card, IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useNavigation, Stack } from 'expo-router';
import { auth, db } from '../../config/firebase';
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { doc, getDoc } from 'firebase/firestore';

// Simulated data for statistics
const fetchUserStats = () => {
  return {
    caloriesIntake: 78,
    walking: 10,
    sleep: 8,
  };
};

// Notification data
const notifications = [
  {
    id: '1',
    icon: 'star',
    iconFamily: 'ionicons',
    title: 'You Started A New Challenge!',
    date: 'May 29 - 9:00 AM',
  },
  {
    id: '2',
    icon: 'bulb',
    iconFamily: 'feather',
    title: 'Don\'t Forget To Drink Water',
    date: 'June 10 - 8:00 AM',
  },
  {
    id: '3',
    icon: 'file-text',
    iconFamily: 'feather',
    title: 'New Article & Tip Posted!',
    date: 'June 09 - 11:00 AM',
  },
];

export default function HomeScreen() {
  const [user, setUser] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [greeting, setGreeting] = useState('Good morning');
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  // Define getUserProfile function locally since it's not exported correctly
  const getUserProfile = async (userId: string) => {
    try {
      const userRef = doc(db, 'users', userId);
      const userSnap = await getDoc(userRef);
      
      if (userSnap.exists()) {
        return userSnap.data();
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error in getUserProfile:", error);
      throw error;
    }
  };

  useEffect(() => {
    // Check if user is logged in
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        
        // Fetch user profile from Firestore
        try {
          console.log("Fetching profile for user:", currentUser.uid);
          const profile = await getUserProfile(currentUser.uid);
          console.log("Profile fetched:", profile);
          setUserProfile(profile);
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
        
        setLoading(false);
      } else {
        // Redirect to login if not logged in
        router.replace('/login');
      }
    });

    // Set greeting based on time of day
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');

    return () => unsubscribe();
  }, []);

  // Format current date
  const formatDate = () => {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
  };

  const currentDate = formatDate();

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  // Get user's stats from profile or use defaults
  const stats = userProfile?.stats || {
    caloriesIntake: 78,
    walking: 10,
    sleep: 8
  };

  // Render notification icon based on icon family
  const renderNotificationIcon = (notification: any) => {
    if (notification.iconFamily === 'ionicons') {
      return <Ionicons name={notification.icon} size={20} color="#fff" />;
    } else if (notification.iconFamily === 'feather') {
      return <Feather name={notification.icon} size={20} color="#fff" />;
    } else {
      return <MaterialCommunityIcons name={notification.icon} size={20} color="#fff" />;
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          {/* User greeting section */}
          <View style={styles.greetingContainer}>
            <View style={styles.userInfoContainer}>
              <Avatar.Image
                size={50}
                source={
                  user.photoURL || userProfile?.photoURL
                    ? { uri: user.photoURL || userProfile?.photoURL }
                    : require('@/assets/images/default-avatar.png')
                }
              />
              <View style={styles.greetingTextContainer}>
                <Text style={styles.greetingText}>{greeting}</Text>
                <Text style={styles.userName}>
                  {userProfile?.firstName || user.displayName?.split(' ')[0] || 'User'}!
                </Text>
              </View>
            </View>
          </View>

          {/* Date display */}
          <Text style={styles.dateText}>{currentDate}</Text>

          {/* Statistics section */}
          <Text style={styles.sectionTitle}>Your Statistics</Text>

          {/* Calories card */}
          <Card style={[styles.card, styles.caloriesCard]}>
            <Card.Content>
              <Text style={styles.cardTitle}>Calories Intake</Text>
              <View style={styles.statContainer}>
                <Text style={[styles.statValue, styles.caloriesValue]}>
                  {stats.caloriesIntake}
                </Text>
                <Text style={styles.statUnit}>bpm</Text>
              </View>
            </Card.Content>
          </Card>

          {/* Activity cards row */}
          <View style={styles.activityRow}>
            {/* Walking card */}
            <Card style={[styles.activityCard, styles.walkingCard]}>
              <Card.Content>
                <View style={styles.activityIconContainer}>
                  <Feather name="activity" size={20} color="#0D9488" />
                  <Text style={styles.activityTitle}>Walking</Text>
                </View>
                <View style={styles.activityStatContainer}>
                  <Text style={[styles.statValue, styles.walkingValue]}>
                    {stats.walking}
                  </Text>
                  <Text style={styles.statUnit}>km</Text>
                </View>
              </Card.Content>
            </Card>

            {/* Sleep card */}
            <Card style={[styles.activityCard, styles.sleepCard]}>
              <Card.Content>
                <View style={styles.activityIconContainer}>
                  <Ionicons name="moon-outline" size={20} color="#3B82F6" />
                  <Text style={styles.activityTitle}>Sleep</Text>
                </View>
                <View style={styles.activityStatContainer}>
                  <Text style={[styles.statValue, styles.sleepValue]}>
                    {stats.sleep}
                  </Text>
                  <Text style={styles.statUnit}>hrs</Text>
                </View>
              </Card.Content>
            </Card>
          </View>

          {/* Notifications section */}
          <View style={styles.notificationsSection}>
            <Text style={styles.sectionTitle}>Notifications</Text>
            <Text style={styles.subSectionTitle}>Today</Text>
            
            {notifications.map((notification) => (
              <View key={notification.id} style={styles.notificationItem}>
                <View style={[
                  styles.notificationIconContainer,
                  { backgroundColor: notification.id === '1' ? '#000' : 
                                    notification.id === '2' ? '#F59E0B' : '#3B82F6' }
                ]}>
                  {renderNotificationIcon(notification)}
                </View>
                <View style={styles.notificationContent}>
                  <Text style={styles.notificationTitle}>{notification.title}</Text>
                  <Text style={styles.notificationDate}>{notification.date}</Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>

        {/* Bottom Navigation Bar */}
        <View style={styles.bottomNavigation}>
          <TouchableOpacity>
            <Image 
              source={require('@/assets/images/grid-icon.png')} 
              style={styles.navIcon} 
            />
          </TouchableOpacity>
          
          <TouchableOpacity>
            <Image 
              source={require('@/assets/images/chart-icon.png')} 
              style={styles.navIcon} 
            />
          </TouchableOpacity>
          
          <View style={styles.addButtonContainer}>
            <TouchableOpacity 
              style={styles.addButtonTouchable}
              onPress={() => router.push('/addMeal')}
            >
              <Text style={styles.plusText}>+</Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity>
            <Image 
              source={require('@/assets/images/heart-icon.png')} 
              style={styles.navIcon} 
            />
          </TouchableOpacity>
          
          <TouchableOpacity>
            <Image 
              source={require('@/assets/images/stats-icon.png')} 
              style={styles.navIcon} 
            />
          </TouchableOpacity>
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
  scrollView: {
    flex: 1,
    padding: 16,
  },
  greetingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4CAF50',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  greetingTextContainer: {
    marginLeft: 12,
  },
  greetingText: {
    fontSize: 14,
    color: '#666',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0A2540',
  },
  samakhContainer: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  samakhText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0A2540',
    marginTop: 16,
    marginBottom: 16,
  },
  subSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0A2540',
    marginBottom: 12,
  },
  card: {
    borderRadius: 16,
    marginBottom: 16,
    elevation: 0,
  },
  caloriesCard: {
    backgroundColor: '#FFE4E6',
  },
  cardTitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  statContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  statValue: {
    fontSize: 48,
    fontWeight: 'bold',
    marginRight: 4,
  },
  caloriesValue: {
    color: '#E11D48',
  },
  walkingValue: {
    color: '#0D9488',
  },
  sleepValue: {
    color: '#3B82F6',
  },
  statUnit: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  activityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  activityCard: {
    width: '48%',
    borderRadius: 16,
    elevation: 0,
  },
  walkingCard: {
    backgroundColor: '#CCFBF1',
  },
  sleepCard: {
    backgroundColor: '#DBEAFE',
  },
  activityIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  activityTitle: {
    fontSize: 16,
    color: '#666',
    marginLeft: 8,
  },
  activityStatContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  notificationsSection: {
    marginBottom: 16,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  notificationIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    color: '#0A2540',
    fontWeight: '500',
  },
  notificationDate: {
    fontSize: 14,
    color: '#666',
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#E6F2FA',
    paddingVertical: 15,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  navIcon: {
    width: 24,
    height: 24,
    tintColor: '#0A2540',
  },
  addButtonContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#0A2540',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -28,
  },
  addButtonTouchable: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
}); 