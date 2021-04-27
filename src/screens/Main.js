import React, { useContext, useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { Context as dataContext } from "../context/dataContext";
import * as SQLite from "expo-sqlite";
import * as Sharing from "expo-sharing";
import img from "../components/img";
const DATA = [
  { id: "1", value: "aaaaaaaaaaaa" },
  { id: "2", value: "bbbbbbbbbbbb" },
  { id: "3", value: "cccccccccc" },
  { id: "4", value: "ddddddddddd" },
  { id: "5", value: "eeeeeeeeeeeee" },
  { id: "6", value: "ffffffffffff" },
  { id: "7", value: "ggggggggggg" },
];

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
      <View
        style={{
          backgroundColor: "#FFD700",
          alignSelf: "stretch",
          height: 230,
          borderRadius: 20,
          margin: 10,
          borderWidth: 5,
          borderColor: "white",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>{data.value}</Text>
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
