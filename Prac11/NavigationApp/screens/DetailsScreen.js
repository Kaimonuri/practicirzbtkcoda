import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';

const DetailsScreen = ({ route, navigation }) => {
  const { contact } = route.params;

  const handleCall = () => {
    Linking.openURL(`tel:${contact.phone}`);
  };

  const handleEmail = () => {
    Linking.openURL(`mailto:${contact.email}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.largeAvatar}>
          <Text style={styles.largeAvatarText}>{contact.name[0]}</Text>
        </View>
        <Text style={styles.name}>{contact.name}</Text>
      </View>

      <View style={styles.detailsContainer}>
        <TouchableOpacity style={styles.detailItem} onPress={handleCall}>
          <Text style={styles.detailLabel}>Телефон</Text>
          <Text style={styles.detailValue}>{contact.phone}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.detailItem} onPress={handleEmail}>
          <Text style={styles.detailLabel}>Email</Text>
          <Text style={styles.detailValue}>{contact.email}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.backButton]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Назад</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.homeButton]}
          onPress={() => navigation.popToTop()}
        >
          <Text style={styles.homeButtonText}>На главную</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#007AFF',
    padding: 32,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  largeAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  largeAvatarText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  detailsContainer: {
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 10,
    padding: 16,
  },
  detailItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  detailLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: '#666',
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
  },
  homeButton: {
    backgroundColor: '#007AFF',
  },
  homeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default DetailsScreen;