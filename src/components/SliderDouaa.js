import React, { useContext, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import { Context as dataContext } from "../context/dataContext";
import Flower from "../assets/flower.svg";
import { DATA1 as data } from "../data/data";
import Exclamation from "../assets/exclamation.svg";
import Toast from "react-native-toast-message";

const { width } = Dimensions.get("screen");

const SliderDouaa = React.memo(
  ({ data, setInfoVisible, infoVisible, test }) => {
    const InfoView = ({ item }) => {
      return (
        <>
          <View
            style={{
              position: "absolute",
              left: 0,
              padding: 10,
              top: 0,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                console.log("thisiss item", item);
                ToastAndroid.showWithGravity(
                  item.info,
                  ToastAndroid.LONG,
                  ToastAndroid.TOP
                );
              }}
              activeOpacity={0.9}
              style={{}}
            >
              <View style={{ alignSelf: "center" }}>
                <Exclamation height={30} width={30} fill="#082c6c" />
              </View>
            </TouchableOpacity>
          </View>
        </>
      );
    };

    const CardViewItem = ({ item }) => {
      return (
        <View style={styles.cardContainer}>
          <ScrollView contentContainerStyle={styles.scrollContentContainer}>
            {item.info && <InfoView item={item} />}
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 10,
                marginBottom: -15,
              }}
            >
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
    };

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
  }
);

export default SliderDouaa;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    borderRadius: 20,
    borderWidth: 1,
  },
  scrollContentContainer: {
    margin: 5,
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center",
  },
  douaaText: {
    marginBottom: 30,
    fontSize: 18,
    textAlign: "center",
    marginTop: 40,
    marginHorizontal: 5,
    fontFamily: "ArabFont2",
    color: "black",
  },
});
