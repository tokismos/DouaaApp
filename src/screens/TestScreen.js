import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  Image,
  Dimensions,
  FlatList,
  ToastAndroid,
} from "react-native";
import { Context as dataContext } from "../context/dataContext";
import * as SQLite from "expo-sqlite";
import { LinearGradient } from "expo-linear-gradient";

import { DATA1, DATA2, CATEGORIES } from "../data/data";
import LottieView from "lottie-react-native";
import IslamicStar from "../assets/IslamicStar.svg";
import Exclamation from "../assets/exclamation.svg";
import DouaaTypes from "../components/DouaaTypes";
import SliderDouaa from "../components/SliderDouaa";
import { useSharedValue } from "react-native-reanimated";
const db = SQLite.openDatabase("db.db");
import Islam from "../assets/islam.svg";
const { width } = Dimensions.get("screen");
const TestScreen = () => {
  const [infoVisible, setInfoVisible] = useState(false);
  const datae = useMemo(() => {
    infoVisible;
  }, [infoVisible]);
  return (
    <LinearGradient colors={["rgba(0,0,0,.3)", "#082c6c"]} style={{ flex: 1 }}>
      <View style={{ flexGrow: 7 }}>
        <View
          style={{
            flex: 1,

            justifyContent: "flex-end",
          }}
        >
          <View style={{}}>
            <LottieView
              style={{
                position: "absolute",
                width: "100%",
                transform: [{ scale: 1 }],
              }}
              speed={1}
              source={require("../assets/lottie/sky.json")}
              autoPlay
              loop
            />
            <Image
              source={require("../assets/islam.png")}
              style={{
                resizeMode: "contain",
                width,
                height: 250,
              }}
            />
          </View>
          <View
            style={{
              backgroundColor: "#FFD700",
              height: "65%",
              alignSelf: "flex-end",
              borderRadius: 20,
            }}
          >
            {infoVisible && (
              <View
                style={{
                  backgroundColor: "green",
                  position: "absolute",
                  zIndex: 1,
                  top: -30,
                }}
              >
                <Text>
                  fdsfdsfds
                  sadsadnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnsdksandlksandsakdsaknfdsfds
                </Text>
              </View>
            )}
            <SliderDouaa
              data={DATA1}
              test={datae}
              setInfoVisible={setInfoVisible}
              infoVisible={infoVisible}
            />
          </View>
        </View>
      </View>
      <View style={{ flexGrow: 1 }}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => {}}
          style={{ alignSelf: "center" }}
        >
          <View style={{}}>
            <LottieView
              style={styles.heart}
              speed={1.5}
              source={require("../assets/lottie/LikeButton.json")}
              autoPlay={false}
              loop={false}
            />
            <IslamicStar height={80} width={80} fill="white" style={{}} />
          </View>
        </TouchableOpacity>
        <DouaaTypes
          style={{
            position: "absolute",
            bottom: 0,
          }}
        />
      </View>
    </LinearGradient>
  );
};

export default TestScreen;

const styles = StyleSheet.create({
  heart: {
    width: 70,
    height: 70,
    left: 3,
    top: 2,
    position: "absolute",
  },
});
