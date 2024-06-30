import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const experiments = [
  {
    name: "AirBnB bottom sheet",
    key: "AirBnB",
  },
];

const Home = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  experimentContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "silver",
    borderBottomWidth: 1,
    borderBottomColor: "silver",
  },
});

export default Home;
