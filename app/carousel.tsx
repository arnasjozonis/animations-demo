import { Stack } from "expo-router";
import { Dimensions, StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import Animated, {
  SharedValue,
  interpolate,
  interpolateColor,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const items = [1, 2, 3, 4, 5];

const windowWidth = Dimensions.get("window").width;

type CarouselItemProps = {
  index: number;
  scrollX: SharedValue<number>;
};

function CarouselItem({ index, scrollX }: CarouselItemProps) {
  const style = useAnimatedStyle(() => ({
    opacity: interpolate(
      scrollX.value,
      [
        (index - 1) * windowWidth,
        index * windowWidth,
        (index + 1) * windowWidth,
      ],
      [0.8, 1, 0.8],
      "clamp"
    ),
    backgroundColor: interpolateColor(
      scrollX.value,
      [
        (index - 1) * windowWidth,
        index * windowWidth,
        (index + 1) * windowWidth,
      ],
      ["gold", "#fff", "silver"]
    ),
    transform: [
      {
        scale: interpolate(
          scrollX.value,
          [
            (index - 1) * windowWidth,
            index * windowWidth,
            (index + 1) * windowWidth,
          ],
          [0.5, 1, 0.5],
          "clamp"
        ),
      },
    ],
  }));

  return (
    <Animated.View style={[itemStyle.container]}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>{index}</Text>
    </Animated.View>
  );
}

const itemStyle = StyleSheet.create({
  container: {
    width: windowWidth - 48,
    marginHorizontal: 24,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    borderColor: "black",
    borderWidth: 1,
  },
});

export default function CarouselDemoScreen() {
  const scrollX = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler((event) => {
    scrollX.value = event.contentOffset.x;
  });

  return (
    <SafeAreaView>
      <Stack.Screen options={{ title: "Carousel demo" }} />
      <Animated.FlatList
        data={items}
        keyExtractor={(item) => item.toString()}
        renderItem={({ index }) => (
          <CarouselItem index={index} scrollX={scrollX} />
        )}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={onScroll}
      />
    </SafeAreaView>
  );
}
