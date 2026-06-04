import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function WelcomeScreen() {
  const { name } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Добро пожаловать, {name || "Гость"}!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
  },
});