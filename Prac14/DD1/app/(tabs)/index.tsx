import { ScrollView, View, Image, Text, StyleSheet } from "react-native";

export default function HomeScreen() {
  const gifs = [
  "https://media.tenor.com/mCiM7CmGGI4AAAAC/naruto.gif",
  "https://media.tenor.com/0AVbKGY_MxMAAAAC/cat-cute.gif",
  "https://media.tenor.com/tEBoZu1ISJ8AAAAC/spinning-cat.gif",
];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        GIF Галерея
      </Text>

      {gifs.map((gif, index) => (
        <View key={index} style={styles.card}>
          <Image
            source={{ uri: gif }}
            style={styles.gif}
          />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },

  card: {
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
  },

  gif: {
    width: "100%",
    height: 250,
    borderRadius: 10,
  },
});