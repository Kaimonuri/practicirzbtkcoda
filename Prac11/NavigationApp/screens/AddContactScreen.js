import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native';

const AddContactScreen = ({ route, navigation }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const handleSave = () => {
    if (!name.trim() || !phone.trim() || !email.trim()) {
      Alert.alert('Ошибка', 'Пожалуйста, заполните все поля');
      return;
    }

    const newContact = {
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
    };

    // Вызываем функцию добавления из первого экрана
    if (route.params?.onAddContact) {
      route.params.onAddContact(newContact);
    }
    
    // Возвращаемся на первый экран
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Имя</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Введите имя"
        />

        <Text style={styles.label}>Телефон</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          placeholder="+7 (XXX) XXX-XX-XX"
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="email@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.cancelButtonText}>Отмена</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.saveButton]}
            onPress={handleSave}
          >
            <Text style={styles.saveButtonText}>Сохранить</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  form: {
    backgroundColor: 'white',
    margin: 16,
    padding: 20,
    borderRadius: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#007AFF',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddContactScreen;