import { View, Text } from "react-native";

export default function ExploreScreen() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 30 }}>
        Explore
      </Text>
    </View>
  );
}