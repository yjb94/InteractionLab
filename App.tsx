import "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import Navigator from "./src/Navigator";
import LoadAssets from "./src/components/LoadAssets";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { fonts as airbnbFonts } from "./src/airbnb";

export default function App() {
  return (
    <LoadAssets fonts={{ ...airbnbFonts }}>
      <GestureHandlerRootView style={styles.rootView}>
        <SafeAreaProvider>
          <Navigator />
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </LoadAssets>
  );
}

const styles = StyleSheet.create({
  rootView: {
    flex: 1,
  },
});
