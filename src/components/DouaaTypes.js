import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { CATEGORIES } from "../data/data";
const DouaaTypes = ({ setCategorie, setData }) => {
  return (
    <View style={{ height: 50 }}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={CATEGORIES}
        keyExtractor={(item) => item.categorie}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={{
                backgroundColor: "white",
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
