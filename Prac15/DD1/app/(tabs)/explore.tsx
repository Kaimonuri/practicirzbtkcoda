import { View, Text } from "react-native";

export default function ExploreScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <Text
        style={{
          fontSize: 28,
          color: "black",
        }}
      >
        SQLite Database
      </Text>
    </View>
  );
}