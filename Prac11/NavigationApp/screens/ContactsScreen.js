import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Button,
  Alert
} from 'react-native';

const ContactsScreen = ({ navigation }) => {
  const [contacts, setContacts] = useState([
    { id: '1', name: 'Иван Иванов', phone: '+7 (999) 123-45-67', email: 'ivan@example.com' },
    { id: '2', name: 'Мария Петрова', phone: '+7 (999) 234-56-78', email: 'maria@example.com' },
    { id: '3', name: 'Алексей Сидоров', phone: '+7 (999) 345-67-89', email: 'alex@example.com' },
  ]);

  // ЭТА ФУНКЦИЯ ДОЛЖНА БЫТЬ ОПРЕДЕЛЕНА
  const handleAddContact = (newContact) => {
    setContacts([...contacts, { ...newContact, id: Date.now().toString() }]);
  };

  const handleDeleteContact = (id) => {
    Alert.alert(
      'Удалить контакт',
      'Вы уверены, что хотите удалить этот контакт?',
      [
        { text: 'Отмена', style: 'cancel' },
        {
          text: 'Удалить',
          onPress: () => setContacts(contacts.filter(contact => contact.id !== id)),
          style: 'destructive'
        }
      ]
    );
  };

  const renderContactItem = ({ item }) => (
    <TouchableOpacity
      style={styles.contactItem}
      onPress={() => navigation.navigate('Details', { contact: item })}
      onLongPress={() => handleDeleteContact(item.id)}
    >
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{item.name[0]}</Text>
      </View>
      <View style={styles.contactInfo}>
        <Text style={styles.contactName}>{item.name}</Text>
        <Text style={styles.contactPhone}>{item.phone}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        renderItem={renderContactItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
      <View style={styles.buttonContainer}>
        <Button
          title="Добавить контакт"
          onPress={() => navigation.navigate('AddContact', { onAddContact: handleAddContact })}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    padding: 16,
  },
  contactItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 12,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  contactPhone: {
    fontSize: 14,
    color: '#666',
  },
  buttonContainer: {
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
});

export default ContactsScreen;