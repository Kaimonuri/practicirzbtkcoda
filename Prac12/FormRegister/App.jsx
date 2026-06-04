import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function App() {
  const [isLogin, setIsLogin] = useState(true);
  
  // Состояния для логина
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  
  // Состояния для регистрации
  const [regUsername, setRegUsername] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [showRegConfirmPassword, setShowRegConfirmPassword] = useState(false);

  const handleLogin = () => {
    if (!loginEmail || !loginPassword) {
      Alert.alert('Ошибка', 'Пожалуйста, заполните все поля');
      return;
    }
    Alert.alert('Успех', 'Авторизация прошла успешно!');
  };

  const handleRegister = () => {
    if (!regUsername || !regEmail || !regPassword || !regConfirmPassword) {
      Alert.alert('Ошибка', 'Пожалуйста, заполните все поля');
      return;
    }
    if (regPassword !== regConfirmPassword) {
      Alert.alert('Ошибка', 'Пароли не совпадают');
      return;
    }
    if (regPassword.length < 6) {
      Alert.alert('Ошибка', 'Пароль должен содержать не менее 6 символов');
      return;
    }
    Alert.alert('Успех', 'Регистрация прошла успешно!');
    setIsLogin(true);
  };

  // Форма входа
  if (isLogin) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          <ScrollView 
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.logoContainer}>
              <Ionicons name="person-circle-outline" size={120} color="#6200ee" />
              <Text style={styles.title}>Добро пожаловать!</Text>
            </View>

            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <Ionicons name="mail-outline" size={24} color="#666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor="#999"
                  value={loginEmail}
                  onChangeText={setLoginEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputContainer}>
                <Ionicons name="lock-closed-outline" size={24} color="#666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Пароль"
                  placeholderTextColor="#999"
                  value={loginPassword}
                  onChangeText={setLoginPassword}
                  secureTextEntry={!showLoginPassword}
                />
                <TouchableOpacity onPress={() => setShowLoginPassword(!showLoginPassword)}>
                  <Ionicons 
                    name={showLoginPassword ? "eye-off-outline" : "eye-outline"} 
                    size={24} 
                    color="#666" 
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Войти</Text>
              </TouchableOpacity>

              <View style={styles.switchContainer}>
                <Text style={styles.switchText}>Нет аккаунта? </Text>
                <TouchableOpacity onPress={() => setIsLogin(false)}>
                  <Text style={styles.switchLink}>Зарегистрироваться</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  // Форма регистрации
  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.headerContainer}>
            <Ionicons name="person-add-outline" size={80} color="#6200ee" />
            <Text style={styles.title}>Создать аккаунт</Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Ionicons name="person-outline" size={24} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Имя пользователя"
                placeholderTextColor="#999"
                value={regUsername}
                onChangeText={setRegUsername}
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons name="mail-outline" size={24} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#999"
                value={regEmail}
                onChangeText={setRegEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={24} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Пароль"
                placeholderTextColor="#999"
                value={regPassword}
                onChangeText={setRegPassword}
                secureTextEntry={!showRegPassword}
              />
              <TouchableOpacity onPress={() => setShowRegPassword(!showRegPassword)}>
                <Ionicons 
                  name={showRegPassword ? "eye-off-outline" : "eye-outline"} 
                  size={24} 
                  color="#666" 
                />
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={24} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Подтвердите пароль"
                placeholderTextColor="#999"
                value={regConfirmPassword}
                onChangeText={setRegConfirmPassword}
                secureTextEntry={!showRegConfirmPassword}
              />
              <TouchableOpacity onPress={() => setShowRegConfirmPassword(!showRegConfirmPassword)}>
                <Ionicons 
                  name={showRegConfirmPassword ? "eye-off-outline" : "eye-outline"} 
                  size={24} 
                  color="#666" 
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleRegister}>
              <Text style={styles.buttonText}>Зарегистрироваться</Text>
            </TouchableOpacity>

            <View style={styles.switchContainer}>
              <Text style={styles.switchText}>Уже есть аккаунт? </Text>
              <TouchableOpacity onPress={() => setIsLogin(true)}>
                <Text style={styles.switchLink}>Войти</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#6200ee',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  switchText: {
    color: '#666',
    fontSize: 14,
  },
  switchLink: {
    color: '#6200ee',
    fontSize: 14,
    fontWeight: 'bold',
  },
});