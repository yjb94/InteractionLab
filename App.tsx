import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import Navigator from "./src/Navigator";
import { fonts as airbnbFonts } from "./src/airbnb";
import LoadAssets from "./src/components/LoadAssets";
import { StatusBar } from "expo-status-bar";

export default function App() {
  const { styles } = useStyles(stylesheet);

  return (
    <LoadAssets fonts={{ ...airbnbFonts }}>
      <StatusBar style="dark" />
      <GestureHandlerRootView style={styles.rootView}>
        <Navigator />
      </GestureHandlerRootView>
    </LoadAssets>
  );
}

const stylesheet = createStyleSheet({
  rootView: {
    flex: 1,
  },
});
