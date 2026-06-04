import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Switch,
  Button,
  Alert,
  StyleSheet,
  Linking,
} from "react-native";

export default function HomeScreen() {
  const [name, setName] = useState("");
  const [notifications, setNotifications] = useState(false);

  const showInfo = () => {
    Alert.alert(
      "Информация",
      `Имя: ${name}\nУведомления: ${
        notifications ? "Включены" : "Выключены"
      }`
    );
  };

  const openGoogle = () => {
    Linking.openURL("https://google.com");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Android Components
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Введите имя"
        placeholderTextColor="#666"
        value={name}
        onChangeText={setName}
      />

      <View style={styles.row}>
        <Text>Получать уведомления</Text>

        <Switch
          value={notifications}
          onValueChange={setNotifications}
        />
      </View>

      <View style={styles.button}>
        <Button
          title="Показать данные"
          onPress={showInfo}
        />
      </View>

      <View style={styles.button}>
        <Button
          title="Открыть Google"
          onPress={openGoogle}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 28,
    textAlign: "center",
    marginBottom: 30,
    color: "#000",
  },

  input: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    color: "#000",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    alignItems: "center",
  },

  button: {
    marginBottom: 10,
  },
});