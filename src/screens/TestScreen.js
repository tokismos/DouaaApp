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
import Toast from "react-native-toast-message";

import { Context as dataContext } from "../context/dataContext";
import * as SQLite from "expo-sqlite";
import { LinearGradient } from "expo-linear-gradient";

import { DATA1, DATA2, CATEGORIES } from "../data/data";
import LottieView from "lottie-react-native";
import IslamicStar from "../assets/IslamicStar.svg";
import Exclamation from "../assets/exclamation.svg";
import DouaaTypes from "../components/DouaaTypes";
import SliderDouaa from "../components/SliderDouaa";
const db = SQLite.openDatabase("db.db");
import Islam from "../assets/islam.svg";
import Notification from "../components/Notification";
const { width } = Dimensions.get("screen");
const TestScreen = () => {
  const { state, addFavorite, syncFavorites, deleteFavorite } = useContext(
    dataContext
  );
  const [DATA, setData] = useState(DATA1);
  const [CATEGORIE, setCategorie] = useState("1");
  const [isFavorite, setIsFavorite] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [infoVisible, setInfoVisible] = useState(false);
  const animation = useRef(null);

  // when you change the categorie by pressing the bottom buttons you set the Data that you will show in slider
  useEffect(() => {
    console.log("this is type:", CATEGORIE);
    switch (CATEGORIE) {
      case "1":
        return setData(DATA1);
      case "2":
        return setData(DATA2);
    }
  }, [CATEGORIE]);

  //create  the table if not exists and sync them  to get the favoriteData context
  useEffect(() => {
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

  //if the current item is in favorite you show the heart in the middle bottom star
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

  // add the favorite to the DB and the favoritesData context
  const addFav = () => {
    addFavorite(DATA[state.index], CATEGORIE);
  };
  // delete the favorite from the DB and the favoritesData context

  const deleteFav = () => {
    deleteFavorite(DATA[state.index], CATEGORIE);
  };

  // the information button in the container

  return (
    <>
      <Notification
        setIsVisible={setIsVisible}
        isVisible={isVisible}
        info={DATA[state.index].info}
      />
      <LottieView
        style={{
          position: "absolute",
          width,
          transform: [{ scale: 1 }],
        }}
        speed={1}
        source={require("../assets/lottie/sky.json")}
        autoPlay
        loop
      />
      <LottieView
        style={{
          position: "absolute",
          width,
          transform: [{ scale: 1 }, { translateX: 20 }],
        }}
        speed={3}
        source={require("../assets/lottie/moreStar.json")}
        autoPlay
        loop
      />
      <LottieView
        style={{
          position: "absolute",
          width,
          transform: [{ scale: 1 }, { translateY: 20 }],
        }}
        speed={0.5}
        source={require("../assets/lottie/moreStar.json")}
        autoPlay
        loop
      />

      <LinearGradient
        colors={["rgba(8, 44, 108,.2)", "#082c6c"]}
        style={{ flex: 1 }}
        start={[0.1, 0.1]}
        end={[0.1, 0.7]}
      >
        <View style={{ flexGrow: 10 }}>
          <View
            style={{
              flex: 1,

              justifyContent: "flex-end",
            }}
          >
            <Image
              source={require("../assets/islam.png")}
              style={{
                resizeMode: "contain",
                width,
                height: 250,
              }}
            />
            <View style={styles.cardContainer}>
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
                data={DATA}
                setInfoVisible={setInfoVisible}
                infoVisible={infoVisible}
              />
            </View>
          </View>
        </View>
        <View style={{ flexGrow: 1 }}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
              isFavorite ? deleteFav() : addFav();
            }}
            style={{ alignSelf: "center" }}
          >
            <View style={{ marginTop: 5, marginBottom: 10 }}>
              <LottieView
                ref={animation}
                style={styles.heart}
                speed={1.5}
                source={require("../assets/lottie/LikeButton.json")}
                autoPlay={false}
                loop={false}
              />
              <IslamicStar height={80} width={80} />
            </View>
          </TouchableOpacity>
          <DouaaTypes
            style={{
              position: "absolute",
              bottom: 0,
            }}
            setCategorie={setCategorie}
            categorie={CATEGORIE}
          />
        </View>
      </LinearGradient>
    </>
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
  cardContainer: {
    marginLeft: 10,
    backgroundColor: "#FFD700",
    borderRightWidth: 3,
    borderLeftWidth: 3,
    borderRightColor: "white",
    height: "65%",
    alignSelf: "flex-end",
    borderRadius: 20,
  },
});
