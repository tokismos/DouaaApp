import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import Navigator from "./src/navigation/Navigator";
import { Provider as DataProvider } from "./src/context/dataContext";
import { useFonts } from "expo-font";
import Toast from "react-native-toast-message";
import { StatusBar } from "expo-status-bar";

export default function App() {
  const [loaded] = useFonts({
    ArabFont2: require("./src/assets/fonts/arabFont2.ttf"),
  });

  if (!loaded) {
    return (
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  return (
    <>
      <Toast ref={(ref) => Toast.setRef(ref)} />

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
