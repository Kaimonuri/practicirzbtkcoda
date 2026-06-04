import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
} from "react-native";
import { router } from "expo-router";

export default function HomeScreen() {
  const [name, setName] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Регистрация
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Введите имя"
        placeholderTextColor="#666"
        value={name}
        onChangeText={setName}
      />

      <Button
        title="Продолжить"
        onPress={() => router.push(`/welcome?name=${name}`)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    textAlign: "center",
    marginBottom: 20,
    color: "#000",
  },
  input: {
    borderWidth: 1,
    borderColor: "#000",
    color: "#000",
    padding: 10,
    marginBottom: 20,
    borderRadius: 8,
  },
});