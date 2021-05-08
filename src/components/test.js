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

const Tmp = ({ data, title, toggled, setToggled }) => {
  const DouaaCard = ({ item }) => {
    const {
      state: { index },
      deleteFavorite,
    } = useContext(dataContext);
    return (
      <View
        style={{
          backgroundColor: "orange",
          borderWidth: 1,
          margin: 20,
          padding: 20,
        }}
      >
        <Button
          title="delete"
          onPress={() => {
            from = true;
            deleteFavorite(item, item.categorie);
          }}
        />
        <Text>{item.value}</Text>
      </View>
    );
  };

  const AnimatedPressable = Animated.createAnimatedComponent(TouchableOpacity);
  return (
    <View style={{}}>
      <AnimatedPressable
        style={[
          styles.touchableHeader,
          { backgroundColor: toggled ? "#FFD700" : "white" },
        ]}
        onPress={() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setToggled(!toggled);
        }}
      >
        <View style={[styles.headerTitle]}>
          <Animated.View style={[]}>
            <Arrow
              height={20}
              width={20}
              fill={toggled ? "white" : "#082c6c"}
            />
          </Animated.View>
          <Text style={{ textAlign: "right" }}>{title}</Text>
        </View>
      </AnimatedPressable>

      {toggled ? (
        <View style={styles.expandedView}>
          {data.map((item) => {
            return <DouaaCard item={item} key={item.id} />;
          })}
        </View>
      ) : null}
    </View>
  );
};
const Test = ({ data, title }) => {
  const prevVal = useRef(0);

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

  return (
    <Tmp title={title} data={data} toggled={toggled} setToggled={setToggled} />
  );
};

export default Test;

const styles = StyleSheet.create({
  touchableHeader: {
    borderWidth: 1,
    margin: 10,
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
    marginHorizontal: 10,
    marginTop: 10,
    backgroundColor: "#FFD700",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
});
