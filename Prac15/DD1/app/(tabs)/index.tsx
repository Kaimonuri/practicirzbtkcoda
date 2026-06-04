import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  FlatList,
} from "react-native";
import Checkbox from "expo-checkbox";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("users.db");

export default function HomeScreen() {
  const [name, setName] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    db.execSync(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT
      );
    `);

    loadUsers();
  }, []);

  const loadUsers = () => {
    const result = db.getAllSync("SELECT * FROM users");
    setUsers(result);
  };

  const register = () => {
    if (!name || !accepted) {
      alert("Введите имя и подтвердите условия");
      return;
    }

    db.runSync(
      "INSERT INTO users (name) VALUES (?)",
      [name]
    );

    setName("");
    setAccepted(false);

    loadUsers();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Регистрация
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Введите имя"
        value={name}
        onChangeText={setName}
      />

      <View style={styles.checkboxContainer}>
        <Checkbox
          value={accepted}
          onValueChange={setAccepted}
        />

        <Text style={styles.label}>
          Согласен с условиями
        </Text>
      </View>

      <Button
        title="Зарегистрироваться"
        onPress={register}
      />

      <Text style={styles.subtitle}>
        Пользователи:
      </Text>

      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text style={styles.user}>
            • {item.name}
          </Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 40,
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },

  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  label: {
    marginLeft: 10,
  },

  subtitle: {
    marginTop: 30,
    fontSize: 20,
    fontWeight: "bold",
  },

  user: {
    fontSize: 18,
    marginTop: 10,
  },
});