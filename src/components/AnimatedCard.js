import React, { useState } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
  withSpring,
  useAnimatedGestureHandler,
  runOnJS,
} from "react-native-reanimated";

const { width } = Dimensions.get("screen");

const SPRING_CONFIG = {
  damping: 80,
  overshootClamping: true,
  restDisplacementThreshold: 0.1,
  restSpeedThreshold: 0.1,
  stiffness: 500,
};
const AnimatedCard = ({ children, touchBarStyle, DATA }) => {
  const left = useSharedValue(0);
  const index = useSharedValue(0);

  const modalStyle = useAnimatedStyle(() => {
    return {
      left: left.value,
    };
  });

  const eventHandler = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      ctx.value = left.value;
    },
    onActive: (event, ctx) => {
      if (
        (index.value + 1 == DATA?.length && event.translationX < 0) ||
        (index.value == 0 && event.translationX > 0)
      )
        return;
      left.value = ctx.value + event.translationX;
    },
    onEnd: (event, ctx) => {
      if (event.translationX < 0 && index.value + 1 != DATA?.length) {
        index.value = index.value + 1;
        left.value = withSpring(-width * index.value, SPRING_CONFIG);
        console.log("Indeexe", index.value);
      }

      if (event.translationX > 0 && index.value != 0) {
        index.value = index.value - 1;

        left.value = withSpring(-width * index.value - 1, SPRING_CONFIG);
        console.log("INDEX", index.value);
      }
    },
  });
  return (
    <>
      <Animated.View style={modalStyle}>{children}</Animated.View>

      <PanGestureHandler onGestureEvent={eventHandler}>
        <Animated.View
          style={[
            {
              backgroundColor: "blue",
              width,
              height: 200,
            },
            touchBarStyle,
          ]}
        />
      </PanGestureHandler>
    </>
  );
};

export default AnimatedCard;

const styles = StyleSheet.create({
  card: {
    alignSelf: "center",
    height: 50,
    width: "90%",
    backgroundColor: "red",
    position: "absolute",
  },
});
