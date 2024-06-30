import { LoadSkiaWeb } from "@shopify/react-native-skia/lib/module/web";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Main } from "./src/Main";
import LoadAssets from "./src/components/LoadAssets";

import { fonts as airbnbFonts } from "./src/airbnb";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (Platform.OS === "web") {
      LoadSkiaWeb({ locateFile: () => "/canvaskit.wasm" })
        .then(() => {
          setLoaded(true);
        })
        .catch((err) => console.error(err));
    } else {
      setLoaded(true);
    }
  }, []);

  if (!loaded) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Loading Skia...</Text>
        <ActivityIndicator style={styles.indicator} />
      </View>
    );
  }

  return (
    <LoadAssets fonts={{ ...airbnbFonts }}>
      <GestureHandlerRootView style={styles.rootView}>
        <SafeAreaProvider>
          <Main />
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </LoadAssets>
  );
}

const styles = StyleSheet.create({
  rootView: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
  },
  indicator: {
    marginTop: 20,
  },
});
