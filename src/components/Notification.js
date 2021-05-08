import React, { useEffect, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const { width } = Dimensions.get("screen");
const Notification = ({ isVisible, setIsVisible, info }) => {
  const opacity = useSharedValue(0);
  const style = useAnimatedStyle(() => {
    return {
      opacity: withTiming(opacity.value, {
        duration: 700,
        easing: Easing.bezier(0.07, 1, 0.33, 0.89),
      }),
    };
  });
  useEffect(() => {
    opacity.value = isVisible ? 1 : 0;
    if (isVisible) {
      setTimeout(() => {
        // opacity.value = 0;
        setIsVisible(false);
      }, 5000);
    }
  }, [isVisible]);

  // const AnimatedPressable = Animated.createAnimatedComponent(TouchableOpacity);

  return (
    <TouchableWithoutFeedback onPress={() => setIsVisible(false)}>
      <Animated.View
        pointerEvents={!isVisible ? "none" : "auto"}
        style={[
          {
            bottom: 0,
            position: "absolute",
            zIndex: 1,
            top: 150,
          },
          style,
        ]}
      >
        <View
          style={{
            alignItems: "center",
            width,
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              marginBottom: 20,
              marginHorizontal: 40,
              borderRadius: 5,
              padding: 20,
            }}
          >
            <Text style={{ textAlign: "center" }}>{info}</Text>
          </View>
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default Notification;

const styles = StyleSheet.create({});
