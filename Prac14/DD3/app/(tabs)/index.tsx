import { View, Text, StyleSheet, Button, Share, Linking } from "react-native";

export default function HomeScreen() {
  const phone = "+79991234567";

  const callContact = () => {
    Linking.openURL(`tel:${phone}`);
  };

  const sendMessage = () => {
    Linking.openURL(`sms:${phone}`);
  };

  const shareContact = async () => {
    await Share.share({
      message: `Контакт: Иван Иванов\nТелефон: ${phone}`,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.avatar}>👤</Text>

      <Text style={styles.name}>
        Иван Иванов
      </Text>

      <Text style={styles.phone}>
        {phone}
      </Text>

      <View style={styles.button}>
        <Button
          title="Позвонить"
          onPress={callContact}
        />
      </View>

      <View style={styles.button}>
        <Button
          title="Написать сообщение"
          onPress={sendMessage}
        />
      </View>

      <View style={styles.button}>
        <Button
          title="Поделиться контактом"
          onPress={shareContact}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  avatar: {
    fontSize: 80,
    marginBottom: 20,
  },

  name: {
    fontSize: 28,
    fontWeight: "bold",
  },

  phone: {
    fontSize: 18,
    marginBottom: 30,
  },

  button: {
    width: "100%",
    marginBottom: 10,
  },
});