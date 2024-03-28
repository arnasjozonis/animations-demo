import { Stack } from "expo-router";
import { StyleSheet } from "react-native";

import { View } from "@/components/Themed";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

const indicatorHeight = 30;
function BallonIndicator({ offsetX }: { offsetX: SharedValue<number> }) {
  const angle = useDerivedValue(() => {
    return 90 + Math.atan2(60, offsetX.value) * (180 / Math.PI);
  });

  const balloonStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: offsetX.value }, { rotate: `${angle.value}deg` }],
  }));

  return (
    <Animated.View
      style={[
        {
          height: indicatorHeight,
          alignItems: "center",
        },
        balloonStyle,
      ]}
    >
      <Animated.View
        style={[{ width: 2, height: 60, backgroundColor: "purple" }]}
      />
      <Animated.View
        style={[
          {
            width: 20,
            height: 20,
            borderRadius: 15,
            backgroundColor: "purple",
          },
        ]}
      />
    </Animated.View>
  );
}

export default function NotFoundScreen() {
  const pressed = useSharedValue(false);
  const offset = useSharedValue(0);

  const pan = Gesture.Pan()
    .onBegin(() => {
      pressed.value = true;
    })
    .onChange((event) => {
      offset.value = event.translationX;
    })
    .onFinalize(() => {
      offset.value = withTiming(0);
      pressed.value = false;
    });

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      { translateX: offset.value },
      { scale: withTiming(pressed.value ? 1.2 : 1) },
    ],
    backgroundColor: pressed.value ? "#FFE04B" : "#b58df1",
  }));

  return (
    <>
      <Stack.Screen options={{ title: "Sticky balloon demo" }} />
      <View style={styles.container}>
        <BallonIndicator offsetX={offset} />

        <GestureDetector gesture={pan}>
          <Animated.View style={[styles.pan, animatedStyles]} />
        </GestureDetector>
      </View>
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
  pan: {
    borderWidth: 4,
    borderColor: "black",
    width: 30,
    aspectRatio: 1,
    borderRadius: 15,
  },
});
