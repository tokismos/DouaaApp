import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";

const DouaaTypes = ({ TYPES, setType }) => {
  return (
    <View style={{ height: 50 }}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={TYPES}
        keyExtractor={(item) => item.value}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={{
                backgroundColor: "white",
                margin: 10,
                padding: 10,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 30,
              }}
              onPress={() => {
                setType(item.type);
              }}
            >
              <Text>{item.value}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default DouaaTypes;

const styles = StyleSheet.create({});
