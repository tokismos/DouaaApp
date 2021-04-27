import React, { useContext, useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { Context as dataContext } from "../context/dataContext";
import * as SQLite from "expo-sqlite";
import Islam from "../assets/islam.svg";
import { DATA } from "../data/data";

const db = SQLite.openDatabase("db.db");
const Main = () => {
  const { state, addFavorite, syncFavorites, deleteFavorite } = useContext(
    dataContext
  );
  const [data, setData] = useState(
    DATA[Math.floor(Math.random() * DATA.length)]
  );
  const [isFavorite, setIsFavorite] = useState(false);

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
        return item.id == data.id;
      });
      setIsFavorite(isFavorite);
    }
  }, [state.FavoritesData, data]);

  const click = () => {
    const index = Math.floor(Math.random() * DATA.length);
    console.log(index);
    setData(DATA[index]);
  };

  const add = () => {
    addFavorite(data);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#082c6c",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={{}}>
        <Islam height={240} width={440} />
      </View>
      <View
        style={{
          backgroundColor: "#FFD700",
          alignSelf: "stretch",
          height: 230,
          borderTopWidth: 0,
          borderBottomWidth: 0,
          borderRadius: 20,
          borderWidth: 3,
          borderColor: "white",
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 5,
          padding: 5,
        }}
      >
        <Text
          style={{ textAlign: "center", fontFamily: "ArabFont", fontSize: 22 }}
        >
          {data.value}
        </Text>
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <View style={{ marginHorizontal: 10 }}>
            <Button title="press" onPress={click} />
          </View>
          {isFavorite ? (
            <Button title="delete" onPress={() => deleteFavorite(data)} />
          ) : (
            <Button title="Add " onPress={add} />
          )}
        </View>
      </View>
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({});
