import React, { useRef } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";

import { Context as dataContext } from "../context/dataContext";
import { AdMobBanner } from "expo-ads-admob";

import Accordeon from "../components/Accordeon";
import { CATEGORIES } from "../data/data";
const Favorites = () => {
  const {
    state,
    state: { FavoritesData },
  } = React.useContext(dataContext);

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
    <>
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
              المرجو الإضافة إلى قائمة الإعجابات.
            </Text>
          </View>
        )}
      </View>
      <View style={{ position: "absolute", bottom: 0 }}>
        <AdMobBanner
          bannerSize="fullBanner"
          adUnitID="ca-app-pub-7065023206422574/9429793880"
          servePersonalizedAds // true or false
        />
      </View>
    </>
  );
};

export default Favorites;

const styles = StyleSheet.create({});
