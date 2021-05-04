import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Sky from "../assets/sky.svg";
const Test = React.memo(() => {
  console.log("rendered");
  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <Sky height="800" width="800" />
    </View>
  );
});
const test = () => {
  return <Test />;
};

export default test;

const styles = StyleSheet.create({});
