import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Share,
} from "react-native";

export default function HomeScreen() {
  const [tab, setTab] = useState("all");

  const posts = [
    {
      id: 1,
      author: "Алексей Иванов",
      faculty: "ИВТ-21",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
      favorite: true,
    },
    {
      id: 2,
      author: "Мария Смирнова",
      faculty: "ПИ-22",
      image:
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644",
      favorite: false,
    },
    {
      id: 3,
      author: "Дмитрий Петров",
      faculty: "ИС-23",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
      favorite: true,
    },
  ];

  const filteredPosts =
    tab === "all"
      ? posts
      : posts.filter((post) => post.favorite);

  const sharePost = async (author: string) => {
    await Share.share({
      message: `Посмотрите публикацию пользователя ${author}`,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topSection}>
        <Text style={styles.logo}>
          StudentNet
        </Text>

        <Text style={styles.subtitle}>
          Новые публикации студентов
        </Text>

        <Image
          source={{
            uri: "https://i.pravatar.cc/300",
          }}
          style={styles.avatar}
        />

        <Text style={styles.name}>
          Сергей Петров
        </Text>

        <Text style={styles.group}>
          ИВТ-21
        </Text>

        <View style={styles.stats}>
          <View>
            <Text style={styles.statNumber}>
              48
            </Text>
            <Text style={styles.statText}>
              Фото
            </Text>
          </View>

          <View>
            <Text style={styles.statNumber}>
              154
            </Text>
            <Text style={styles.statText}>
              Друзья
            </Text>
          </View>

          <View>
            <Text style={styles.statNumber}>
              12
            </Text>
            <Text style={styles.statText}>
              Посты
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity
          onPress={() => setTab("all")}
        >
          <Text
            style={[
              styles.tab,
              tab === "all" && styles.activeTab,
            ]}
          >
            Все
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setTab("favorites")}
        >
          <Text
            style={[
              styles.tab,
              tab === "favorites" &&
                styles.activeTab,
            ]}
          >
            Любимые
          </Text>
        </TouchableOpacity>
      </View>

      {filteredPosts.map((post) => (
        <View
          key={post.id}
          style={styles.card}
        >
          <Image
            source={{ uri: post.image }}
            style={styles.image}
          />

          <View style={styles.cardFooter}>
            <View>
              <Text style={styles.author}>
                {post.author}
              </Text>

              <Text style={styles.faculty}>
                {post.faculty}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.shareButton}
              onPress={() =>
                sharePost(post.author)
              }
            >
              <Text
                style={
                  styles.shareButtonText
                }
              >
                ↗
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF8E1",
  },

  topSection: {
    backgroundColor: "#FFC107",
    paddingTop: 60,
    paddingBottom: 40,
    alignItems: "center",
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },

  logo: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#5D4037",
  },

  subtitle: {
    marginTop: 10,
    fontSize: 16,
    color: "#6D4C41",
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginTop: 25,
  },

  name: {
    marginTop: 15,
    fontSize: 24,
    fontWeight: "bold",
    color: "#5D4037",
  },

  group: {
    color: "#795548",
    marginTop: 4,
  },

  stats: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "90%",
    marginTop: 25,
  },

  statNumber: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    color: "#5D4037",
  },

  statText: {
    color: "#6D4C41",
    marginTop: 4,
  },

  tabs: {
    flexDirection: "row",
    paddingHorizontal: 25,
    marginTop: 20,
    marginBottom: 10,
  },

  tab: {
    marginRight: 30,
    fontSize: 18,
    color: "#777",
    fontWeight: "600",
    paddingBottom: 5,
  },

  activeTab: {
    color: "#FF8F00",
    borderBottomWidth: 3,
    borderBottomColor: "#FF8F00",
  },

  card: {
    backgroundColor: "#fff",
    marginHorizontal: 15,
    marginBottom: 20,
    borderRadius: 25,
    overflow: "hidden",
    elevation: 5,
  },

  image: {
    width: "100%",
    height: 240,
  },

  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
  },

  author: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#5D4037",
  },

  faculty: {
    color: "#888",
    marginTop: 3,
  },

  shareButton: {
    backgroundColor: "#FFC107",
    width: 45,
    height: 45,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  shareButtonText: {
    fontSize: 22,
    color: "#5D4037",
    fontWeight: "bold",
  },
});