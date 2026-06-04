import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function WorkoutScreen() {
  const { title, time } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {title}
      </Text>

      <Text style={styles.time}>
        Длительность: {time}
      </Text>

      <Text style={styles.description}>
        Комплекс упражнений для поддержания хорошей физической формы.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#f2f2f2',
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  time: {
    fontSize: 20,
    color: '#ff7f00',
    marginBottom: 20,
  },

  description: {
    textAlign: 'center',
    fontSize: 16,
    color: '#555',
  },
});