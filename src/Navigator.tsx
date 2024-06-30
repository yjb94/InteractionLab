import {
  NavigationContainer,
  NavigationContainerProps,
} from "@react-navigation/native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AirBnB from "./airbnb";
import Home from "./Home";

const Stack = createStackNavigator();

const Navigator = () => {
  const handleStateChange: NavigationContainerProps["onStateChange"] = (
    state
  ) => {
    // TODO: persist state on dev
  };

  return (
    <NavigationContainer onStateChange={handleStateChange}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AirBnB" component={AirBnB} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
