import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
} from 'react-native';

import { router } from 'expo-router';

const workouts = [
  { id: '1', title: 'Разминка', time: '12 мин' },
  { id: '2', title: 'Аэробика 1', time: '20 мин' },
  { id: '3', title: 'Аэробика 2', time: '20 мин' },
  { id: '4', title: 'Аэробика 3', time: '20 мин' },
  { id: '5', title: 'Аэробика 4', time: '20 мин' },
  { id: '6', title: 'Заминка', time: '10 мин' },
];

export default function HomeScreen() {
  const openWorkout = (item: any) => {
    router.push({
      pathname: '/workout',
      params: {
        title: item.title,
        time: item.time,
      },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          FITNESS PROGRAM
        </Text>
      </View>

      <View style={styles.banner}>
        <Text style={styles.bannerTitle}>
          5+ ЧАСОВ ТРЕНИРОВОК
        </Text>

        <Text style={styles.bannerSubtitle}>
          ПОДХОДИТ ДЛЯ ЛЮБОГО УРОВНЯ
        </Text>
      </View>

      <FlatList
        data={workouts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => openWorkout(item)}
          >
            <View>
              <Text style={styles.name}>
                {item.title}
              </Text>

              <Text style={styles.time}>
                {item.time}
              </Text>
            </View>

            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    paddingTop:
      Platform.OS === 'android'
        ? StatusBar.currentHeight
        : 50,
  },

  header: {
    backgroundColor: '#000',
    padding: 18,
    alignItems: 'center',
  },

  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },

  banner: {
    margin: 15,
    backgroundColor: '#ff7f00',
    borderRadius: 12,
    padding: 20,
  },

  bannerTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },

  bannerSubtitle: {
    color: '#fff',
    marginTop: 8,
    fontSize: 15,
  },

  card: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginVertical: 6,
    padding: 18,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  name: {
    fontSize: 18,
    fontWeight: '600',
  },

  time: {
    color: '#666',
    marginTop: 4,
  },

  arrow: {
    fontSize: 28,
    color: '#888',
  },
});