import React from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  Share,
} from "react-native";

export default function HomeScreen() {
  const posts = [
    {
      id: 1,
      author: "Иван",
      text: "Сегодня изучаю React Native.",
      image:
        "https://reactnative.dev/img/tiny_logo.png",
    },
    {
      id: 2,
      author: "Анна",
      text: "Закончила лабораторную работу.",
      image:
        "https://reactnative.dev/img/tiny_logo.png",
    },
    {
      id: 3,
      author: "Максим",
      text: "Публикую новый пост в социальной сети.",
      image:
        "https://reactnative.dev/img/tiny_logo.png",
    },
  ];

  const sharePost = async (text: string) => {
    try {
      await Share.share({
        message: text,
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Социальная сеть</Text>

      {posts.map((post) => (
        <View key={post.id} style={styles.card}>
          <Text style={styles.author}>{post.author}</Text>

          <Image
            source={{ uri: post.image }}
            style={styles.image}
          />

          <Text style={styles.post}>{post.text}</Text>

          <Button
            title="Поделиться"
            onPress={() => sharePost(post.text)}
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
    backgroundColor: "#fff",
    margin: 10,
    padding: 15,
    borderRadius: 10,
  },

  author: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  image: {
    width: "100%",
    height: 150,
    marginBottom: 10,
  },

  post: {
    fontSize: 16,
    marginBottom: 10,
  },
});