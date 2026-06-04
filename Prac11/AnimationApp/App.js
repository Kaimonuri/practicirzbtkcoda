import React, { useRef, useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  View,
  ImageBackground,
  Animated,
  useWindowDimensions,
  TouchableOpacity,
  Easing
} from 'react-native';

const images = [
  'https://images.unsplash.com/photo-1556740749-887f6717d7e4',
  'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9',
  'https://images.unsplash.com/photo-1513151233558-860c5392816c',
  'https://images.unsplash.com/photo-1535223289827-42f1e9919769',
  'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70',
  'https://images.unsplash.com/photo-1546032996-6dfacbacbf3f',
];

// ЛАУНЧСКРИН с анимацией (появляется на 2.5 секунды)
const LaunchScreen = ({ onFinish }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Параллельная анимация
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
    ]).start();

    // Переход к основному экрану через 2.5 секунды
    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => onFinish());
    }, 2500);
  }, []);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View style={[styles.launchContainer, { opacity: fadeAnim }]}>
      <Animated.Text
        style={[
          styles.launchText,
          {
            transform: [{ scale: scaleAnim }, { rotate }],
          },
        ]}
      >
        📱
      </Animated.Text>
      <Animated.Text style={[styles.launchSubtitle, { opacity: fadeAnim }]}>
        Добро пожаловать!
      </Animated.Text>
    </Animated.View>
  );
};

// КОМПОНЕНТ с анимацией появления (FadeIn)
const FadeInView = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View
      style={{
        ...props.style,
        opacity: fadeAnim,
      }}
    >
      {props.children}
    </Animated.View>
  );
};

// АНИМИРОВАННАЯ КНОПКА
const AnimatedButton = ({ title, onPress }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <View style={styles.animatedButton}>
          <Text style={styles.animatedButtonText}>{title}</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

// ГЛАВНЫЙ КОМПОНЕНТ
export default function App() {
  const scrollX = useRef(new Animated.Value(0)).current;
  const { width: windowWidth } = useWindowDimensions();
  const [showLaunch, setShowLaunch] = useState(true);

  if (showLaunch) {
    return <LaunchScreen onFinish={() => setShowLaunch(false)} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <FadeInView style={styles.fadeContainer}>
        <Text style={styles.title}>Галерея изображений</Text>

        {/* СЛАЙДЕР с горизонтальной прокруткой */}
        <View style={styles.scrollContainer}>
          <ScrollView
            horizontal={true}
            style={styles.scrollViewStyle}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: {
                      x: scrollX,
                    },
                  },
                },
              ],
              { useNativeDriver: false }
            )}
            scrollEventThrottle={16}
          >
            {images.map((image, imageIndex) => {
              return (
                <View
                  style={{ width: windowWidth, height: 300 }}
                  key={imageIndex}
                >
                  <ImageBackground
                    source={{ uri: image }}
                    style={styles.card}
                    imageStyle={{ borderRadius: 15 }}
                  >
                    <View style={styles.textContainer}>
                      <Text style={styles.infoText}>
                        Изображение {imageIndex + 1}
                      </Text>
                    </View>
                  </ImageBackground>
                </View>
              );
            })}
          </ScrollView>

          {/* АНИМИРОВАННЫЕ ИНДИКАТОРЫ */}
          <View style={styles.indicatorContainer}>
            {images.map((image, imageIndex) => {
              const width = scrollX.interpolate({
                inputRange: [
                  windowWidth * (imageIndex - 1),
                  windowWidth * imageIndex,
                  windowWidth * (imageIndex + 1),
                ],
                outputRange: [8, 24, 8],
                extrapolate: 'clamp',
              });

              const opacity = scrollX.interpolate({
                inputRange: [
                  windowWidth * (imageIndex - 1),
                  windowWidth * imageIndex,
                  windowWidth * (imageIndex + 1),
                ],
                outputRange: [0.5, 1, 0.5],
                extrapolate: 'clamp',
              });

              return (
                <Animated.View
                  key={imageIndex}
                  style={[styles.normalDot, { width, opacity }]}
                />
              );
            })}
          </View>
        </View>

        {/* ИНФОРМАЦИОННАЯ ПАНЕЛЬ */}
        <View style={styles.infoPanel}>
          <Text style={styles.infoTitle}>О галерее</Text>
          <Text style={styles.infoDescription}>
            Свайпайте влево/вправо для просмотра изображений. 
            Индикаторы внизу меняют размер и прозрачность.
          </Text>
        </View>

        {/* АНИМИРОВАННАЯ КНОПКА */}
        <View style={styles.buttonContainer}>
          <AnimatedButton
            title="Обновить галерею"
            onPress={() => {
              console.log('Галерея обновлена');
            }}
          />
        </View>
      </FadeInView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  fadeContainer: {
    flex: 1,
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
    color: '#333',
  },
  scrollContainer: {
    height: 350,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollViewStyle: {
    flexGrow: 0,
  },
  card: {
    flex: 1,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 15,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    backgroundColor: 'rgba(0,0,0, 0.6)',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 10,
  },
  infoText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  normalDot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#007AFF',
    marginHorizontal: 4,
  },
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  infoPanel: {
    backgroundColor: 'white',
    margin: 16,
    padding: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  infoDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  animatedButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  animatedButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  launchContainer: {
    flex: 1,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  launchText: {
    fontSize: 80,
    marginBottom: 20,
  },
  launchSubtitle: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
});