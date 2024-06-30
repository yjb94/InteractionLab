import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import {
  UnistylesRuntime,
  createStyleSheet,
  useStyles,
} from "react-native-unistyles";

const experiments = [
  {
    name: "AirBnB bottom sheet",
    key: "AirBnB",
  },
];

const Home = () => {
  const navigation = useNavigation();
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      {experiments.map((experiment) => {
        const onPress = () => {
          // FIXME
          navigation.navigate(experiment.key);
        };

        return (
          <Pressable
            key={experiment.key}
            style={styles.experimentContainer}
            onPress={onPress}
          >
            <Text>{experiment.name}</Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const stylesheet = createStyleSheet({
  container: {
    paddingTop: UnistylesRuntime.insets.top,
  },
  experimentContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "silver",
    borderBottomWidth: 1,
    borderBottomColor: "silver",
  },
});

export default Home;
