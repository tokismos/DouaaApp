import React from "react";
import { StyleSheet, Text, View } from "react-native";

const InfoView = ({ toggleInfo, info }) => {
  return (
    <>
      <View>
        {toggleInfo && (
          <Text
            style={[
              {
                backgroundColor: "white",
                textAlign: "center",
                padding: 3,
                margin: 5,
                borderWidth: 0.3,
                borderColor: "black",
                borderRadius: 5,
              },
            ]}
          >
            {info}
          </Text>
        )}
      </View>
    </>
  );
};

export default InfoView;

const styles = StyleSheet.create({});
