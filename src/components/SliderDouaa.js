import React, { useContext, useRef } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import Carousel from "react-native-snap-carousel";
import { Context as dataContext } from "../context/dataContext";

const { width } = Dimensions.get("screen");
const SliderDouaa = ({ data }) => {
  const inputEl = useRef(null);
  const {
    state: { index },
    setIndex,
  } = useContext(dataContext);
  const Test = ({ item }) => {
    return (
      <View
        style={{
          backgroundColor: "white",
          height: 300,
          alignItems: "center",
          justifyContent: "center",
          margin: 20,
          borderRadius: 20,
          borderWidth: 1,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            textAlign: "center",
            margin: 15,
            fontFamily: "ArabFont2",
          }}
        >
          {item.value}
        </Text>
      </View>
    );
  };
  return (
    <Carousel
      ref={inputEl}
      layout={"stack"}
      data={data}
      sliderWidth={width}
      itemWidth={width}
      inactiveSlideOpacity={1}
      lockScrollTimeoutDuration={1000}
      activeAnimationType={"spring"}
      layoutCardOffset={0}
      firstItem={parseInt(index)}
      onSnapToItem={(index) => setIndex(index)}
      renderItem={({ item }, index) => {
        return <Test item={item} />;
      }}
    />
  );
};

export default SliderDouaa;

const styles = StyleSheet.create({});
