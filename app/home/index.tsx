import React from 'react';
import { StyleSheet, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Avatar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, router } from 'expo-router';
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';

export default function HomeScreen() {
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
                source={require('@/assets/images/default-avatar.png')}
              />
              <View style={styles.greetingTextContainer}>
                <Text style={styles.greetingText}>Good morning,</Text>
                <Text style={styles.userName}>Jane Doe!</Text>
              </View>
            </View>
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationText}>10</Text>
            </View>
          </View>

          {/* Date display */}
          <Text style={styles.dateText}>JUNE 06, 2024</Text>

          {/* Statistics section */}
          <Text style={styles.sectionTitle}>Your Statistics</Text>

          <View style={styles.statsContainer}>
            {/* Calories card */}
            <View style={[styles.statCard, styles.caloriesCard]}>
              <Text style={styles.statLabel}>Calories Burned</Text>
              <View style={styles.statValueContainer}>
                <Text style={styles.statValue}>28</Text>
                <Text style={styles.statUnit}>grms</Text>
              </View>
            </View>

            {/* Sleep card */}
            <View style={[styles.statCard, styles.sleepCard]}>
              <Text style={styles.statLabel}>Sleep</Text>
              <View style={styles.statValueContainer}>
                <Text style={styles.statValue}>8</Text>
                <Text style={styles.statUnit}>hr</Text>
              </View>
            </View>

            {/* Walk card */}
            <View style={[styles.statCard, styles.walkCard]}>
              <Text style={styles.statLabel}>walk</Text>
              <View style={styles.statValueContainer}>
                <Text style={styles.statValue}>10</Text>
                <Text style={styles.statUnit}>KM</Text>
              </View>
            </View>

            {/* Water Intake card */}
            <View style={[styles.statCard, styles.waterCard]}>
              <Text style={styles.statLabel}>Water Intake</Text>
              <View style={styles.statValueContainer}>
                <Text style={styles.statValue}>1.5</Text>
                <Text style={styles.statUnit}>(L)</Text>
              </View>
            </View>
          </View>

          {/* Tip of the Day */}
          <View style={styles.tipContainer}>
            <Text style={styles.tipTitle}>Tip Of The Day!</Text>
            <View style={styles.tipCard}>
              <Text style={styles.tipText}>Did You Know? Drinking 4.5L Of Water Daily Boosts Metabolism And Keeps Your Skin Glowing! 💧</Text>
            </View>
          </View>

          {/* Updates section */}
          <View style={styles.updatesSection}>
            <Text style={styles.sectionTitle}>Updates</Text>
            <Text style={styles.subTitle}>Today</Text>

            {/* Hydration Alert */}
            <View style={styles.updateItem}>
              <View style={[styles.updateIcon, { backgroundColor: '#3B82F6' }]}>
                <MaterialCommunityIcons name="water" size={24} color="#fff" />
              </View>
              <View style={styles.updateContent}>
                <Text style={styles.updateText}>Hydration Alert: "You've Only Had 1.5L Of Water Today! Stay Hydrated 💧"</Text>
                <Text style={styles.updateTime}>March - 6:00 PM</Text>
              </View>
            </View>

            {/* Meal Reminder */}
            <View style={styles.updateItem}>
              <View style={[styles.updateIcon, { backgroundColor: '#F59E0B' }]}>
                <MaterialCommunityIcons name="food" size={24} color="#fff" />
              </View>
              <View style={styles.updateContent}>
                <Text style={styles.updateText}>Meal Reminder: "Forgot To Log Your Lunch?"</Text>
                <Text style={styles.updateTime}>March - 9:00 PM</Text>
              </View>
            </View>

            {/* Water Intake Update */}
            <View style={styles.updateItem}>
              <View style={[styles.updateIcon, { backgroundColor: '#3B82F6' }]}>
                <MaterialCommunityIcons name="water" size={24} color="#fff" />
              </View>
              <View style={styles.updateContent}>
                <Text style={styles.updateText}>Your Water Intake Improved By 15% This Week! Stay Hydrated</Text>
                <Text style={styles.updateTime}>March - 6:00 PM</Text>
              </View>
            </View>
          </View>

          {/* Social Feed Section */}
          <View style={styles.socialSection}>
            <Text style={styles.sectionTitle}>Look What's Aryan is Eating</Text>
            <View style={styles.socialCard}>
              <View style={styles.socialHeader}>
                <Avatar.Image
                  size={40}
                  source={require('@/assets/images/default-avatar.png')}
                />
                <Text style={styles.socialName}>Aryan</Text>
              </View>
              <Image
                source={require('@/assets/images/image 1.png')}
                style={styles.foodImage}
                resizeMode="cover"
              />
              <View style={styles.socialActions}>
                <TouchableOpacity>
                  <Feather name="heart" size={24} color="#666" />
                </TouchableOpacity>
                <TouchableOpacity style={{ marginLeft: 16 }}>
                  <Feather name="message-circle" size={24} color="#666" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity>
            <Image source={require('@/assets/images/grid-icon.png')} style={styles.navIcon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('@/assets/images/chart-icon.png')} style={styles.navIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/insights')}>
            <Image source={require('@/assets/images/heart-icon.png')} style={styles.navIcon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('@/assets/images/stats-icon.png')} style={styles.navIcon} />
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
    color: '#000',
  },
  notificationBadge: {
    backgroundColor: '#10B981',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  notificationText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    width: '48%',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  caloriesCard: {
    backgroundColor: '#FFE4E6',
  },
  sleepCard: {
    backgroundColor: '#DBEAFE',
  },
  walkCard: {
    backgroundColor: '#CCFBF1',
  },
  waterCard: {
    backgroundColor: '#DBEAFE',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  statValueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginRight: 4,
  },
  statUnit: {
    fontSize: 12,
    color: '#666',
  },
  tipContainer: {
    marginBottom: 24,
  },
  tipTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
  },
  tipCard: {
    backgroundColor: '#FEF3C7',
    padding: 16,
    borderRadius: 16,
  },
  tipText: {
    fontSize: 14,
    color: '#92400E',
    lineHeight: 20,
  },
  updatesSection: {
    marginBottom: 24,
  },
  subTitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  updateItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  updateIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  updateContent: {
    flex: 1,
  },
  updateText: {
    fontSize: 14,
    color: '#000',
    marginBottom: 4,
  },
  updateTime: {
    fontSize: 12,
    color: '#666',
  },
  socialSection: {
    marginBottom: 24,
  },
  socialCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  socialHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  socialName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  foodImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  socialActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#E6F2FA',
    paddingVertical: 16,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  navIcon: {
    width: 24,
    height: 24,
    tintColor: '#0A2540',
  },
  addButton: {
    width: 56,
    height: 56,
    backgroundColor: '#0A2540',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -28,
  },
  addButtonText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
});