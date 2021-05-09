import React, { useContext, useRef } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import Carousel from "react-native-snap-carousel";
import { Context as dataContext } from "../context/dataContext";
import Flower from "../assets/flower.svg";
import { ScrollView } from "react-native-gesture-handler";

const { width } = Dimensions.get("screen");
const SliderDouaa = ({ data }) => {
  const inputEl = useRef(null);
  const {
    state: { index },
    setIndex,
  } = useContext(dataContext);
  const CardViewItem = ({ item }) => {
    return (
      <View
        style={{
          backgroundColor: "#F5F5F5",
          height: 300,
          alignItems: "center",
          justifyContent: "center",
          margin: 20,
          borderRadius: 20,
          borderWidth: 1,
        }}
      >
        <ScrollView
          contentContainerStyle={{
            marginTop: 5,
            flexGrow: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {item.numOfRead && (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text style={{ position: "absolute", top: 15 }}>
                {item.numOfRead}
              </Text>
              <Flower
                height={100}
                width={100}
                style={{ marginTop: -25, marginBottom: -35 }}
              />
            </View>
          )}
          <Text
            style={{
              fontSize: 18,
              textAlign: "center",
              margin: 15,
              fontFamily: "ArabFont2",
              color: "black",
            }}
          >
            {item.value}
          </Text>
        </ScrollView>
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
        return <CardViewItem item={item} />;
      }}
    />
  );
};

export default SliderDouaa;

const styles = StyleSheet.create({});
