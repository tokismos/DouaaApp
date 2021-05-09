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

import Islam from "../assets/islam.svg";
import { DATA1, DATA2, CATEGORIES } from "../data/data";
import LottieView from "lottie-react-native";
import IslamicStar from "../assets/IslamicStar.svg";
import Exclamation from "../assets/exclamation.svg";
import DouaaTypes from "../components/DouaaTypes";
import SliderDouaa from "../components/SliderDouaa";
import { useSharedValue } from "react-native-reanimated";
const db = SQLite.openDatabase("db.db");
const { width } = Dimensions.get("screen");
import Toast from "react-native-toast-message";
import Notification from "../components/Notification";

const SPRING_CONFIG = {
  damping: 80,
  overshootClamping: true,
  restDisplacementThreshold: 0.1,
  restSpeedThreshold: 0.1,
  stiffness: 500,
};
const Main = () => {
  const { state, addFavorite, syncFavorites, deleteFavorite } = useContext(
    dataContext
  );
  const [DATA, setData] = useState(DATA1);
  const [CATEGORIE, setCategorie] = useState("1");
  const [isFavorite, setIsFavorite] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const animation = useRef(null);

  const tmp = useMemo(() => DATA, [DATA]);
  useEffect(() => {
    console.log("this is type:", CATEGORIE);
    switch (CATEGORIE) {
      case "1":
        return setData(DATA1);
      case "2":
        return setData(DATA2);
    }
  }, [CATEGORIE]);

  // Begin---> create the DB and fetch the data from it to show it in the favourite screen
  React.useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists douaae (id integer not null, value text,categorie text,info text,numOfRead text);",
        [],
        () => console.log("succeeded"),
        () => console.log("failed")
      );
    });
    console.log(state);
    syncFavorites();
  }, []);
  // END

  useEffect(() => {
    if (state.FavoritesData) {
      const isFavorite = state.FavoritesData.find((item) => {
        return item.id == DATA[state.index]?.id && CATEGORIE == item.categorie;
      });
      setIsFavorite(isFavorite);
      if (isFavorite) {
        animation.current.play(40, 40);
      } else {
        animation.current.play(0, 0);
      }
    }
  }, [state.FavoritesData, state.index, isFavorite, CATEGORIE]);

  const addFav = () => {
    addFavorite(tmp[state.index], CATEGORIE);
  };

  const deleteFav = () => {
    console.log("hihihih", DATA[state.index]);
    deleteFavorite(DATA[state.index], CATEGORIE);
  };

  const InfoView = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setIsVisible(true);
        }}
        style={{
          position: "absolute",
          top: -25,
          padding: 20,
          zIndex: 1,
        }}
      >
        <View style={{ alignSelf: "center" }}>
          <Exclamation height={30} width={30} fill="#082c6c" />
        </View>
      </TouchableOpacity>
    );
  };
  console.log("OH FUCK IT REREDNER");
  return (
    <>
      <Notification
        setIsVisible={setIsVisible}
        isVisible={isVisible}
        info={DATA[state.index].info}
      />
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "#082c6c",
        }}
      >
        <LottieView
          style={{
            position: "absolute",
            width: "100%",
            transform: [{ scale: 1.5 }],
          }}
          speed={1}
          source={require("../assets/lottie/sky.json")}
          autoPlay
          loop
        />

        <LottieView
          style={{
            position: "absolute",
            width: "100%",
            zIndex: 3,
            transform: [{ scale: 1.2 }, { translateY: 30 }],
          }}
          speed={0.5}
          source={require("../assets/lottie/moreStar.json")}
          autoPlay
          loop
        />
        <LottieView
          style={{
            position: "absolute",
            width: "100%",
            zIndex: 3,
            transform: [{ scale: 1.5 }, { translateY: 50 }],
          }}
          speed={3}
          source={require("../assets/lottie/moreStar.json")}
          autoPlay
          loop
        />
        <LottieView
          style={{
            position: "absolute",
            width: "100%",
            zIndex: 3,
            transform: [{ scale: 1.5 }, { translateX: 20 }],
          }}
          speed={1}
          source={require("../assets/lottie/moreStar.json")}
          autoPlay
          loop
        />
        <LottieView
          style={{
            position: "absolute",
            width: "100%",
            zIndex: 3,
            transform: [{ scale: 1.5 }, { translateX: 100 }],
          }}
          speed={0.5}
          source={require("../assets/lottie/moreStar.json")}
          autoPlay
          loop
        />
        <LottieView
          style={{
            position: "absolute",
            width: "100%",
            zIndex: 3,
            transform: [{ scale: 1.5 }, { translateX: 70 }],
          }}
          speed={0.5}
          source={require("../assets/lottie/moreStar.json")}
          autoPlay
          loop
        />
        <LottieView
          style={{
            position: "absolute",
            width: "100%",
            zIndex: 3,
            transform: [{ scale: 1.5 }, { translateY: 70 }],
          }}
          speed={0.5}
          source={require("../assets/lottie/moreStar.json")}
          autoPlay
          loop
        />

        <Image
          source={require("../assets/sky2.jpg")}
          style={{ height: "70%", width: "100%", opacity: 0.3 }}
        />
      </View>
      <LinearGradient
        colors={["rgba(0,0,0,.3)", "#082c6c"]}
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
        start={[0.1, 0.1]}
        end={[0.1, 0.6]}
      >
        <Islam height={240} width={440} style={{ marginTop: -100 }} />
        <View style={styles.container}>
          {DATA[state.index].info && <InfoView item={DATA[state.index].info} />}
          <SliderDouaa data={tmp} />
        </View>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => {
            isFavorite ? deleteFav() : addFav();
          }}
          style={{
            position: "absolute",
            bottom: 10,
            left: width / 2 - 40,
          }}
        >
          <LottieView
            ref={animation}
            style={{
              width: 70,
              height: 70,
              position: "absolute",
              left: 3,
              top: 2,
            }}
            speed={1.5}
            source={require("../assets/lottie/LikeButton.json")}
            autoPlay={false}
            loop={false}
          />
          <IslamicStar height={80} width={80} fill="white" style={{}} />
        </TouchableOpacity>
      </LinearGradient>

      <DouaaTypes setCategorie={setCategorie} />
    </>
  );
};

export default Main;

const styles = StyleSheet.create({
  text: {
    fontFamily: "ArabFont2",
    fontSize: 20,
    padding: 10,
    borderWidth: 1,
    backgroundColor: "white",
    borderRadius: 10,
  },
  container: {
    backgroundColor: "#FFD700",
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "white",
    alignItems: "center",
    marginHorizontal: 5,
    height: "50%",
    alignSelf: "stretch",
    padding: 10,
  },
  botViewContainer: {
    marginHorizontal: 10,
    alignSelf: "flex-end",
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "space-evenly",
  },
});
