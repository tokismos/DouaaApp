import React, { useContext, useEffect, useRef, useState } from "react";
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
} from "react-native";
import { Context as dataContext } from "../context/dataContext";
import * as SQLite from "expo-sqlite";
import { LinearGradient } from "expo-linear-gradient";

import Islam from "../assets/islam.svg";
import { DATA1, DATA2, CATEGORIES } from "../data/data";
import LottieView from "lottie-react-native";
import IslamicStar from "../assets/IslamicStar.svg";
import DouaaTypes from "../components/DouaaTypes";
import SliderDouaa from "../components/SliderDouaa";
const db = SQLite.openDatabase("db.db");
const { width } = Dimensions.get("screen");
const SPRING_CONFIG = {
  damping: 80,
  overshootClamping: true,
  restDisplacementThreshold: 0.1,
  restSpeedThreshold: 0.1,
  stiffness: 500,
};
let from = false;
const Main = ({ navigation, route }) => {
  const { state, addFavorite, syncFavorites, deleteFavorite } = useContext(
    dataContext
  );
  const [douaaIndex, setDouaaIndex] = useState(0);
  const [DATA, setData] = useState(DATA1);
  const [CATEGORIE, setCategorie] = useState("1");
  const [isFavorite, setIsFavorite] = useState(false);
  const animation = useRef(null);

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
        "create table if not exists douaae (id integer not null, value text,categorie text);",
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
    addFavorite(DATA[state.index], CATEGORIE);
    animation.current.play(10, 40);
  };

  const deleteFav = () => {
    console.log("hihihih", DATA[state.index]);
    deleteFavorite(DATA[state.index], CATEGORIE);
    animation.current.play(50, 90);
  };

  return (
    <>
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
          <SliderDouaa data={DATA} />

          {/* <Allah
            height={300}
            width={300}
            fill="#082c6c"
            style={{ position: "absolute", bottom: -10 }}
          /> */}
        </View>
        <TouchableOpacity
          onPress={() => {
            isFavorite ? deleteFav() : addFav();
          }}
          style={{
            position: "absolute",
            bottom: 10,
            left: width / 2 - 40,
            zIndex: 1,
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
              zIndex: 4,
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
