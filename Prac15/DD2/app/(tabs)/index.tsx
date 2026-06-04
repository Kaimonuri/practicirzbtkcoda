import { View, Text, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Новости технологий
      </Text>

      <WebView
        source={{ uri: "https://www.wikipedia.org" }}
        style={styles.webview}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 10,
  },

  webview: {
    flex: 1,
  },
});