import { setStatusBarBackgroundColor } from "expo-status-bar";
import React, { useEffect, useState, useRef, useContext } from "react";
import {
  LayoutAnimation,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from "react-native";
import { Context as dataContext } from "../context/dataContext";
import LottieView from "lottie-react-native";

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Arrow from "../assets/arrow.svg";
import Close from "../assets/close.svg";
import Flower from "../assets/flower.svg";
import InfoView from "./InfoViewFavorite";

const DouaaCard = ({ item }) => {
  const {
    state: { index },
    deleteFavorite,
  } = useContext(dataContext);
  const [toggleInfo, setToggleInfo] = useState(false);
  const animation = useRef();

  return (
    <View
      style={{
        backgroundColor: "#F5F5F5",
        borderWidth: 1,
        margin: 10,
        padding: 10,
        borderRadius: 10,
      }}
    >
      <TouchableOpacity
        onPress={() => deleteFavorite(item, item.categorie)}
        style={{
          position: "absolute",
          right: 0,
          padding: 5,
        }}
      >
        <Close height={20} width={20} fill="red" />
      </TouchableOpacity>
      <View style={{ alignItems: "center" }}>
        {item.info && (
          <TouchableOpacity
            style={{
              position: "absolute",
              left: 0,
              opacity: 0.7,
              padding: 10,
              marginLeft: -10,
              marginTop: -10,
              marginRight: -10,
            }}
            onPress={() => {
              animation.current.play(57, 57);

              LayoutAnimation.configureNext(
                LayoutAnimation.Presets.easeInEaseOut
              );

              setToggleInfo(!toggleInfo);
            }}
          >
            <View style={{ height: 25, width: 25 }}>
              <LottieView
                ref={animation}
                source={require("../assets/lottie/info.json")}
                autoPlay
                loop
              />
            </View>
            {/* <Exclamation width={20} height={20} fill={"black"} /> */}
          </TouchableOpacity>
        )}
        {item.numOfRead && (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={{ position: "absolute", top: 15 }}>
              {item.numOfRead}
            </Text>
            <Flower
              height={100}
              width={100}
              style={{ marginTop: -25, marginBottom: -15 }}
            />
          </View>
        )}
      </View>
      <InfoView
        toggleInfo={toggleInfo}
        setToggleInfo={setToggleInfo}
        info={item.info}
      />
      <Text
        style={{
          textAlign: "center",
          margin: 5,
          marginTop: item.numOfRead ? 0 : 20,
          marginHorizontal: -5,
          fontFamily: "ArabFont2",
          fontSize: 18,
          color: "black",
        }}
      >
        {item.value}
      </Text>
    </View>
  );
};

const Accordeon = ({ data, title }) => {
  const [toggled, setToggled] = useState(0);
  useEffect(() => {
    if (Platform.OS === "android") {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);
  useEffect(() => {
    if (toggled) {
      botRadius.value = 0;
      return (rotation.value = withTiming("180deg"));
    }
    botRadius.value = 5;
    rotation.value = withTiming("0deg");
  }, [toggled]);

  const rotation = useSharedValue("0deg");
  const botRadius = useSharedValue(5);
  const arrowStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: rotation.value }],
    };
  });
  const bottomRadius = useAnimatedStyle(() => {
    return {
      borderBottomLeftRadius: withTiming(botRadius.value),
      borderBottomRightRadius: withTiming(botRadius.value),
    };
  });
  const AnimatedPressable = Animated.createAnimatedComponent(TouchableOpacity);

  return (
    <View style={{}}>
      <AnimatedPressable
        style={[
          styles.touchableHeader,
          bottomRadius,
          { backgroundColor: "#F5F5F5" },
        ]}
        onPress={() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setToggled(!toggled);
        }}
      >
        <View style={[styles.headerTitle]}>
          <Animated.View style={[arrowStyle]}>
            <Arrow height={20} width={20} fill={"#082c6c"} />
          </Animated.View>
          <Text
            style={{
              textAlign: "right",
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            - {title}
          </Text>
        </View>
      </AnimatedPressable>

      {toggled ? (
        <View style={styles.expandedView}>
          {data.map((item) => {
            return (
              <DouaaCard item={item} key={item.id} setToggled={setToggled} />
            );
          })}
        </View>
      ) : null}
    </View>
  );
};

export default Accordeon;

const styles = StyleSheet.create({
  touchableHeader: {
    borderWidth: 1,
    margin: 5,
    marginBottom: 0,
    borderBottomWidth: 0,

    padding: 10,
    borderRadius: 5,
  },
  headerTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  expandedView: {
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: "white",
    marginHorizontal: 10,
    marginTop: 1,
    backgroundColor: "white",
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
});
