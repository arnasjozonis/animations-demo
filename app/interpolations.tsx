import { Stack } from "expo-router";
import { Button, StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Interpolations() {
  const animation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    width: 100,
    aspectRatio: 1,
    backgroundColor: "blue",
    transform: [{ scale: interpolate(animation.value, [0, 1], [0.5, 1.5]) }],
    opacity: interpolate(animation.value, [0, 1], [0.5, 1]),
  }));

  const toggle = () => {
    animation.value = withSpring(animation.value === 0 ? 1 : 0);
  };

  return (
    <>
      <Stack.Screen options={{ title: "Interpolations demo" }} />
      <SafeAreaView style={styles.container}>
        <Animated.View style={animatedStyle} />
        <View style={styles.bottom}>
          <Button title="toggle" onPress={toggle} />
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
  bottom: {
    position: "absolute",
    bottom: 48,
    justifyContent: "flex-end",
    alignItems: "center",
  },
});
