import React from "react";
import { StyleSheet, Text, View } from "react-native";
import createDataContext from "./createDataContext";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("db.db");

const dataReducer = (state, action) => {
  switch (action.type) {
    case "ADD_FAVORITE":
      return {
        ...state,
        FavoritesData: [...state.FavoritesData, action.payload],
      };
    case "DELETE_FAVORITE":
      return {
        ...state,
        FavoritesData: state.FavoritesData.filter((item) => {
          return (
            item.id != action.payload.id ||
            item.categorie != action.payload.categorie
          );
        }),
      };
    case "SYNC_FAVORITES":
      return { ...state, FavoritesData: action.payload };
    default:
      return state;
  }
};

const addFavorite = (dispatch) => (data, categorie) => {
  console.log("aded");
  db.transaction(
    (tx) => {
      tx.executeSql(
        "insert into douaae  values(?,?,?) ",
        [data.id, data.value, categorie],
        (_, resultSet) => console.log("Added successfuly"),
        (e, s) => console.log("AN eRROR:", s)
      );
    },
    (e) => console.log(e),
    () => console.log("added")
  );
  dispatch({ type: "ADD_FAVORITE", payload: { ...data, categorie } });
};

const deleteFavorite = (dispatch) => (data, categorie) => {
  db.transaction(
    (tx) => {
      tx.executeSql(
        "DELETE FROM douaae WHERE id = ? AND  categorie =?",
        [data.id, categorie],
        (_, resultSet) => console.log("Deletted successfuly"),
        (e, s) => console.log("AN eRROR:", s)
      );
    },
    (e) => console.log("ERRR", e),
    () => console.log("added")
  );

  dispatch({ type: "DELETE_FAVORITE", payload: { ...data, categorie } });
};
const syncFavorites = (dispatch) => () => {
  db.transaction(
    (tx) => {
      tx.executeSql("select * from douaae", [], (_, resultSet) => {
        dispatch({ type: "SYNC_FAVORITES", payload: resultSet.rows._array });
      });
    },
    (e) => console.log("this is an error", e),
    (s) => console.log("this is a success", s)
  );
};

export const { Provider, Context } = createDataContext(
  dataReducer,
  { addFavorite, syncFavorites, deleteFavorite },
  { FavoritesData: "" }
);
