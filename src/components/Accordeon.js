import { setStatusBarBackgroundColor } from "expo-status-bar";
import React, {
  useEffect,
  useState,
  useRef,
  createRef,
  useContext,
} from "react";
import {
  LayoutAnimation,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
  Button,
} from "react-native";
import { Context as dataContext } from "../context/dataContext";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import Arrow from "../assets/arrow.svg";
import Close from "../assets/close.svg";
import Flower from "../assets/flower.svg";

const DouaaCard = ({ item }) => {
  const {
    state: { index },
    deleteFavorite,
  } = useContext(dataContext);
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
        <Text style={{ position: "absolute", top: 15 }}>تقرأ مرتين</Text>
        <Flower
          height={100}
          width={100}
          style={{ marginTop: -25, marginBottom: -15 }}
        />
      </View>
      <Text
        style={{
          textAlign: "center",
          margin: 5,
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
  const prevVal = useRef(1);
  const [toggled, setToggled] = useState(prevVal.current);
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
            <Arrow
              height={20}
              width={20}
              fill={toggled ? "#082c6c" : "#082c6c"}
            />
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
              <DouaaCard
                item={item}
                key={item.id}
                setToggled={setToggled}
                prevVal={prevVal}
              />
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
