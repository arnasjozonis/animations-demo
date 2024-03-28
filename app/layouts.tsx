import { Stack } from "expo-router";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

import Animated, {
  FadeIn,
  FadeInLeft,
  FadeInUp,
  FlipInEasyX,
  FlipOutXUp,
  Layout,
  LinearTransition,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CarouselDemoScreen() {
  const scrollX = useSharedValue(0);

  const [showLong, setShowLong] = React.useState(false);
  const [circleVisible, setCircleVisible] = React.useState(false);

  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
      <Stack.Screen options={{ title: "Layouts demo" }} />
      {showLong ? (
        <Animated.View
          key="demo"
          style={[styles.cardShort]}
          layout={LinearTransition}
        >
          <Animated.View entering={FadeIn} exiting={FadeInUp}>
            <Text>Short card</Text>
          </Animated.View>
        </Animated.View>
      ) : (
        <Animated.View
          key="demo"
          style={[styles.cardShort, styles.cardLong]}
          layout={LinearTransition}
        >
          <Animated.View>
            <Text style={{ color: "white" }}>Long card</Text>
          </Animated.View>
        </Animated.View>
      )}
      {circleVisible && (
        <Animated.View
          style={styles.circle}
          layout={LinearTransition}
          entering={FlipInEasyX}
          exiting={FlipOutXUp}
        />
      )}
      <View style={styles.bottom}>
        <Button
          title="Toggle card size"
          onPress={() => setShowLong((prev) => !prev)}
        />
        <Button
          title="Toggle circle visible"
          onPress={() => setCircleVisible((prev) => !prev)}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cardShort: {
    width: "80%",
    height: 120,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "white",
  },
  cardLong: {
    height: 360,
    backgroundColor: "#040404",
    borderColor: "white",
    borderWidth: 3,
  },
  bottom: {
    position: "absolute",
    bottom: 48,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 45,
    marginTop: 50,
    backgroundColor: "purple",
  },
});
