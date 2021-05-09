import React, { useEffect, useState } from "react";
import {
  Button,
  Dimensions,
  LayoutAnimation,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const InfoView = ({ toggleInfo, setToggleInfo, info }) => {
  return (
    <>
      <View>
        {toggleInfo && (
          <Text
            style={[
              {
                backgroundColor: "white",
                textAlign: "center",
                padding: 3,
                margin: 5,
                borderWidth: 0.3,
                borderColor: "gray",
                borderRadius: 5,
              },
            ]}
          >
            {info}
          </Text>
        )}
      </View>
    </>
  );
};

export default InfoView;

const styles = StyleSheet.create({});
