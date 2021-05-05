import React, { useContext, useEffect } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { Context, Context as dataContext } from "../context/dataContext";

const Favorites = ({ navigation, route }) => {
  const { state, addFavorite, deleteFavorite } = React.useContext(Context);
  useEffect(() => {
    console.log("thisis state :", state.FavoritesData);
  }, [state]);

  const FavoriteItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={{ backgroundColor: "white", margin: 20, padding: 20 }}
        onPress={() => {
          navigation.navigate("Home", {
            index: item.id,
            categorie: item.categorie,
          });
        }}
      >
        <Text style={{ textAlign: "center" }}>{item.value}</Text>
        <Button
          title="delete"
          onPress={() => {
            deleteFavorite(item, item.categorie);
          }}
        />
      </TouchableOpacity>
    );
  };
  return (
    <View
      style={{
        justifyContent: "center",
        flex: 1,
        paddingTop: 50,
        backgroundColor: "#082c6c",
      }}
    >
      <FlatList
        data={state.FavoritesData}
        keyExtractor={(item) => (Math.random() * 1000000000).toString()}
        renderItem={({ item }) => {
          return <FavoriteItem item={item} />;
        }}
      />
    </View>
  );
};

export default Favorites;

const styles = StyleSheet.create({});
