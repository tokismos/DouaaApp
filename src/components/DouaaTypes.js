import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Context as dataContext } from "../context/dataContext";
import { CATEGORIES } from "../data/data";

const DouaaTypes = ({ setCategorie, style, categorie }) => {
  const { setIndex } = useContext(dataContext);
  return (
    <View style={{ ...style }}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={CATEGORIES}
        keyExtractor={(item) => item.categorie}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={{
                backgroundColor:
                  categorie == item.categorie ? "yellow" : "white",
                margin: 10,
                padding: 10,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
              }}
              onPress={() => {
                setCategorie(item.categorie);
              }}
            >
              <Text style={{}}>{item.name}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default DouaaTypes;

const styles = StyleSheet.create({});
