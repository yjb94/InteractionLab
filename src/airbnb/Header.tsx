import React from "react";
import { Dimensions, Image, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

const { width } = Dimensions.get("window");

const Header = () => {
  const { styles } = useStyles(stylesheet);
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

const stylesheet = createStyleSheet({
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
