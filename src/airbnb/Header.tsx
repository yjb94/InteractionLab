import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import React from "react";

const { width } = Dimensions.get("window");

const Header = () => {
  return (
    <View>
      <Image
        source={require("./assets/tiny-home.jpg")}
        style={styles.image}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    overflow: "hidden",
  },
  image: {
    width: width,
    height: width,
  },
});

export default Header;
