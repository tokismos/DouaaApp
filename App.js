import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Navigator from "./src/navigation/Navigator";
import { Provider as DataProvider } from "./src/context/dataContext";
import { useFonts } from "expo-font";

export default function App() {
  const [loaded] = useFonts({
    ArabFont: require("./src/assets/fonts/arabFont.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <>
      <DataProvider>
        <View style={{ flex: 1 }}>
          <Navigator />
        </View>
      </DataProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
