import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Navigator from "./src/navigation/Navigator";
import { Provider as DataProvider } from "./src/context/dataContext";
import { useFonts } from "expo-font";
import Toast from "react-native-toast-message";

export default function App() {
  const [loaded] = useFonts({
    ArabFont: require("./src/assets/fonts/arabFont.ttf"),
    ArabFont2: require("./src/assets/fonts/arabFont2.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <>
      <DataProvider>
        <View style={{ flex: 1 }}>
          <Navigator />
          <StatusBar translucent />
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
