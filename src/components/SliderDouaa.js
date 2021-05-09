import React, { useContext, useRef } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import Carousel from "react-native-snap-carousel";
import { Context as dataContext } from "../context/dataContext";
import Flower from "../assets/flower.svg";
import { ScrollView } from "react-native-gesture-handler";
import { DATA1 as data } from "../data/data";
const { width } = Dimensions.get("screen");

const CardViewItem = React.memo(({ item }) => {
  return (
    <View style={styles.cardContainer}>
      <ScrollView contentContainerStyle={styles.scrollContentContainer}>
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

        <Text style={styles.douaaText}>{item.value}</Text>
      </ScrollView>
    </View>
  );
});

const SliderDouaa = React.memo(({ data }) => {
  const inputEl = useRef(null);
  const {
    state: { index },
    setIndex,
  } = useContext(dataContext);
  console.log("sLIIIIDER");

  return (
    <Carousel
      ref={inputEl}
      layout={"stack"}
      data={data}
      sliderWidth={width}
      inactiveSlideOpacity={1}
      layoutCardOffset={0}
      itemWidth={width}
      firstItem={parseInt(index)}
      onSnapToItem={(index) => setIndex(index)}
      renderItem={({ item }, index) => {
        console.log("errrrrrrrrrf");
        return <CardViewItem item={item} />;
      }}
    />
  );
});

export default SliderDouaa;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#F5F5F5",
    height: 300,
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
    borderRadius: 20,
    borderWidth: 1,
  },
  scrollContentContainer: {
    marginTop: 5,
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  douaaText: {
    fontSize: 18,
    textAlign: "center",
    margin: 15,
    fontFamily: "ArabFont2",
    color: "black",
  },
});
