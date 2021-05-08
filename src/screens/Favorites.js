import React, { useContext, useEffect, useRef } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { Context as dataContext } from "../context/dataContext";

import Accordeon from "../components/Accordeon";
import { CATEGORIES, DATA1 } from "../data/data";
const Favorites = () => {
  const {
    state,
    state: { FavoritesData },
    deleteFavorite,
    setIndex,
  } = React.useContext(dataContext);
  useEffect(() => {}, [state]);

  const AccordeonFavoriteItem = ({ categorie, title }) => {
    let array = FavoritesData.filter((item) => item.categorie == categorie);
    if (!array.length) return null;
    return (
      <View style={{}}>
        <Accordeon data={array} title={title} />
      </View>
    );
  };
  const scrollViewRef = useRef();
  return (
    <View
      style={{
        flex: 1,
        paddingTop: 50,
        backgroundColor: "#082c6c",
        justifyContent: "center",
      }}
    >
      {FavoritesData.length ? (
        <ScrollView
          style={{ flex: 1 }}
          ref={scrollViewRef}
          onContentSizeChange={() => {}}
        >
          <View
            style={{
              justifyContent: "center",
              flex: 1,

              backgroundColor: "#082c6c",
            }}
          >
            {CATEGORIES.map((item) => (
              <AccordeonFavoriteItem
                categorie={item.categorie}
                key={item.categorie}
                title={item.name}
              />
            ))}
          </View>
        </ScrollView>
      ) : (
        <View
          style={{
            margin: 20,
            height: 200,
            borderWidth: 1,
            borderColor: "white",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white" }}>
            There's no categories, pls Add one{" "}
          </Text>
        </View>
      )}
    </View>
  );
};

export default Favorites;

const styles = StyleSheet.create({});
