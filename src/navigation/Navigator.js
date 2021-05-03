import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Main from "../screens/Main";
import Favorites from "../screens/Favorites";

const Tab = createBottomTabNavigator();

const BottomNavigatorScreens = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: { backgroundColor: "#082c6c" },
      }}
      barStyle={{ backgroundColor: "red" }}
    >
      <Tab.Screen
        name="Home"
        component={Main}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="home" size={30} color="white" />
            ) : (
              <Ionicons name="home-outline" size={30} color="white" />
            ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={Favorites}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <AntDesign name="heart" size={30} color="white" />
            ) : (
              <AntDesign name="hearto" size={30} color="white" />
            ),
        }}
      />
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
