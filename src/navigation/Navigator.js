import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Main from "../screens/Main";
import Favorites from "../screens/Favorites";

const Tab = createBottomTabNavigator();

const BottomNavigatorScreens = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Main} />
      <Tab.Screen name="Favorites" component={Favorites} />
    </Tab.Navigator>
  );
};

export default () => {
  return (
    <NavigationContainer>
      <BottomNavigatorScreens />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});
