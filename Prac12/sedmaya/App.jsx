import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Switch,
  ActivityIndicator,
  Modal,
  FlatList,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function App() {
  // State для различных элементов
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const [sliderValue, setSliderValue] = useState(50);
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Данные для FlatList
  const menuItems = [
    { id: '1', title: 'Профиль', icon: 'person-outline' },
    { id: '2', title: 'Настройки', icon: 'settings-outline' },
    { id: '3', title: 'Уведомления', icon: 'notifications-outline' },
    { id: '4', title: 'Выход', icon: 'log-out-outline' },
  ];

  const handleSubmit = () => {
    if (!name || !email) {
      Alert.alert('Ошибка', 'Пожалуйста, заполните все поля');
      return;
    }
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert('Успех', `Добро пожаловать, ${name}!`);
    }, 2000);
  };

  const renderMenuItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.menuItem}
      onPress={() => {
        setSelectedItem(item.title);
        Alert.alert('Выбрано', `Вы выбрали: ${item.title}`);
      }}
    >
      <Ionicons name={item.icon} size={24} color="#6200ee" />
      <Text style={styles.menuText}>{item.title}</Text>
      <Ionicons name="chevron-forward-outline" size={20} color="#ccc" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* Заголовок */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>React Native Demo</Text>
          <Text style={styles.headerSubtitle}>Лабораторная работа №7</Text>
        </View>

        {/* Форма ввода */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ввод данных</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Имя</Text>
            <TextInput
              style={styles.input}
              placeholder="Введите ваше имя"
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="example@mail.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Отправить</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Интерактивные элементы */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Интерактивные элементы</Text>
          
          {/* Switch */}
          <View style={styles.rowItem}>
            <Text style={styles.rowLabel}>Включить уведомления</Text>
            <Switch
              trackColor={{ false: '#767577', true: '#6200ee' }}
              thumbColor="#f4f3f4"
              onValueChange={setIsEnabled}
              value={isEnabled}
            />
          </View>

          {/* Безопасный слайдер */}
          <View style={styles.rowItem}>
            <Text style={styles.rowLabel}>Значение: {Math.round(sliderValue)}</Text>
            <View style={styles.sliderContainer}>
              <TouchableOpacity 
                style={styles.sliderButton}
                onPress={() => setSliderValue(Math.max(0, sliderValue - 10))}
              >
                <Text style={styles.sliderButtonText}>-</Text>
              </TouchableOpacity>
              <View style={styles.sliderValue}>
                <Text>{sliderValue}</Text>
              </View>
              <TouchableOpacity 
                style={styles.sliderButton}
                onPress={() => setSliderValue(Math.min(100, sliderValue + 10))}
              >
                <Text style={styles.sliderButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Модальное окно */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Модальное окно</Text>
          <TouchableOpacity 
            style={[styles.button, styles.secondaryButton]}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.secondaryButtonText}>Открыть модальное окно</Text>
          </TouchableOpacity>
        </View>

        {/* Список меню */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Меню</Text>
          <FlatList
            data={menuItems}
            renderItem={renderMenuItem}
            keyExtractor={item => item.id}
            scrollEnabled={false}
          />
        </View>

        {/* Статус переключателя */}
        {isEnabled && (
          <View style={styles.infoBox}>
            <Ionicons name="notifications" size={24} color="#6200ee" />
            <Text style={styles.infoText}>Уведомления включены</Text>
          </View>
        )}

      </ScrollView>

      {/* Модальное окно */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Ionicons name="information-circle" size={50} color="#6200ee" />
            <Text style={styles.modalTitle}>Информация</Text>
            <Text style={styles.modalText}>
              Это пример модального окна в React Native. 
              Здесь можно разместить любую дополнительную информацию.
            </Text>
            <TouchableOpacity 
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Закрыть</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#6200ee',
    padding: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#e0e0e0',
    marginTop: 5,
  },
  section: {
    backgroundColor: '#fff',
    margin: 15,
    padding: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#6200ee',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#6200ee',
  },
  secondaryButtonText: {
    color: '#6200ee',
    fontSize: 16,
    fontWeight: 'bold',
  },
  rowItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  rowLabel: {
    fontSize: 16,
    color: '#333',
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  sliderButton: {
    backgroundColor: '#6200ee',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  sliderValue: {
    width: 50,
    alignItems: 'center',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 15,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#e8e0f5',
    margin: 15,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    gap: 10,
  },
  infoText: {
    color: '#6200ee',
    fontSize: 14,
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  modalText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#6200ee',
    padding: 12,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});