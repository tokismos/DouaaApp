import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  Image,
} from "react-native";

import { Context as dataContext } from "../context/dataContext";
import * as SQLite from "expo-sqlite";
import { LinearGradient } from "expo-linear-gradient";

import Islam from "../assets/islam.svg";
import { DATA } from "../data/data";
import LottieView from "lottie-react-native";
import Left from "../assets/left.svg";
import Right from "../assets/right.svg";
const db = SQLite.openDatabase("db.db");
let from = false;
const Main = () => {
  const { state, addFavorite, syncFavorites, deleteFavorite } = useContext(
    dataContext
  );
  const [douaaIndex, setDouaaIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const animation = useRef(null);

  React.useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists douaae (id integer not null, value text);",
        [],
        () => console.log("succeeded"),
        () => console.log("failed")
      );
    });
    console.log(state);
    syncFavorites();
  }, []);

  useEffect(() => {
    if (state.FavoritesData) {
      const isFavorite = state.FavoritesData.find((item) => {
        return item.id == DATA[douaaIndex].id;
      });
      setIsFavorite(isFavorite);
      if (!from) {
        if (isFavorite) {
          animation.current.play(40, 40);
        } else {
          animation.current.play(0, 0);
        }
      }
      console.log("this is from", from);
      from = false;
    }
  }, [state.FavoritesData, douaaIndex]);

  const nextDouaa = () => {
    const nextIndex = douaaIndex + 1;

    if (nextIndex < DATA.length) {
      setDouaaIndex(nextIndex);
    }
  };
  const previousDouaa = () => {
    const previousIndex = douaaIndex - 1;

    if (previousIndex > 0) {
      setDouaaIndex(previousIndex);
    }
  };

  const addFav = () => {
    addFavorite(DATA[douaaIndex]);
    from = true;
    animation.current.play(10, 40);
  };

  const deleteFav = () => {
    deleteFavorite(DATA[douaaIndex]);
    from = true;
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
        }}
      >
        <Image
          source={require("../assets/sky2.jpg")}
          style={{ height: "70%", width: "100%" }}
        />
      </View>

      <LinearGradient
        colors={["rgba(0,0,0,.3)", "#082c6c"]}
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
        start={[0.1, 0]}
        end={[0.5, 0.8]}
      >
        <Islam height={240} width={440} />
        <View style={styles.container}>
          <Text style={[styles.text]}>{DATA[douaaIndex].value}</Text>
          <View
            style={{
              flexDirection: "row",
              marginTop: 10,
            }}
          >
            <View style={styles.botViewContainer}>
              <TouchableOpacity
                onPress={previousDouaa}
                disabled={douaaIndex == 0}
              >
                <Left
                  height={40}
                  width={40}
                  fill={douaaIndex == 0 ? "gray" : "#082c6c"}
                />
              </TouchableOpacity>

              <View
                style={{
                  height: 60,
                  width: 60,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  onPress={isFavorite ? deleteFav : addFav}
                  disabled={douaaIndex == 0}
                >
                  <LottieView
                    ref={animation}
                    style={{
                      width: 150,
                      height: 150,
                    }}
                    speed={1.5}
                    source={require("../assets/lottie/LikeButton.json")}
                    autoPlay={false}
                    loop={false}
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={nextDouaa}>
                <Right
                  height={40}
                  width={40}
                  fill={douaaIndex == DATA.length - 1 ? "gray" : "#082c6c"}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </LinearGradient>
    </>
  );
};

export default Main;

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
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
