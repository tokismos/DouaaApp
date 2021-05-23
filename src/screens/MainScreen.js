import React, { useContext, useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
} from "react-native";

import { Context as dataContext } from "../context/dataContext";
import * as SQLite from "expo-sqlite";
import { LinearGradient } from "expo-linear-gradient";

import {
  DATA1,
  DATA2,
  DATA3,
  DATA4,
  DATA5,
  DATA6,
  DATA7,
  DATA8,
} from "../data/data";
import LottieView from "lottie-react-native";
import IslamicStar from "../assets/IslamicStar.svg";
import DouaaTypes from "../components/DouaaTypes";
import SliderDouaa from "../components/SliderDouaa";
const db = SQLite.openDatabase("db.db");
import { AdMobInterstitial } from "expo-ads-admob";
const { width } = Dimensions.get("screen");

const TestScreen = () => {
  const { state, addFavorite, syncFavorites, deleteFavorite, setIndex } =
    useContext(dataContext);
  const [DATA, setData] = useState(DATA1);
  const [CATEGORIE, setCategorie] = useState("1");
  const [isFavorite, setIsFavorite] = useState(false);
  const [infoVisible, setInfoVisible] = useState(false);
  const animation = useRef(null);

  const ad = async () => {
    await AdMobInterstitial.setAdUnitID(
      "ca-app-pub-7065023206422574/4744158002"
    );
    await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true });
    AdMobInterstitial.getIsReadyAsync().then(() => {
      AdMobInterstitial.showAdAsync().catch((e) => console.log(e));
    });
  };
  useEffect(() => {
    if (state.index % 5 == 0) {
      const showORNot = Math.round(Math.random());
      console.log(showORNot);
      showORNot ? ad() : null;
    }
  }, [state.index]);
  // when you change the categorie by pressing the bottom buttons you set the Data that you will show in slider

  // When you add a categorie you hsould add it here and in the data file at the bottom
  useEffect(() => {
    console.log("this is type:", CATEGORIE);
    switch (CATEGORIE) {
      case "1":
        return setData(DATA1);
      case "2":
        return setData(DATA2);
      case "3":
        return setData(DATA3);
      case "4":
        return setData(DATA4);
      case "5":
        return setData(DATA5);
      case "6":
        return setData(DATA6);
      case "7":
        return setData(DATA7);
      case "8":
        return setData(DATA8);
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
  }, [state.FavoritesData, state.index, CATEGORIE]);

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
    backgroundColor: "#FFD700",
    height: "65%",
    alignSelf: "flex-end",
    borderRadius: 20,
  },
});
