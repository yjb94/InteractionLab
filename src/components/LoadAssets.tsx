import React, { ReactElement, useEffect, useState } from "react";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { LoadSkiaWeb } from "@shopify/react-native-skia/lib/module/web";

export type FontSource = Parameters<typeof Font.loadAsync>[0];
const usePromiseAll = (promises: Promise<any>[], cb: () => void) =>
  useEffect(() => {
    (async () => {
      await Promise.all(promises);
      cb();
    })();
  });

const useLoadAssets = (assets: number[], fonts: FontSource): boolean => {
  const [ready, setReady] = useState(false);

  usePromiseAll(
    [Font.loadAsync(fonts), ...assets.map((asset) => Asset.loadAsync(asset))],
    () => setReady(true)
  );
  return ready;
};

interface LoadAssetsProps {
  fonts?: FontSource;
  assets?: number[];
  children: ReactElement | ReactElement[];
}

export default ({ assets, fonts, children }: LoadAssetsProps) => {
  const assetsReady = useLoadAssets(assets || [], fonts || {});
  const [skiaWebLoaded, setSkiaWebLoaded] = useState(false);

  useEffect(() => {
    if (Platform.OS === "web") {
      LoadSkiaWeb({ locateFile: () => "/canvaskit.wasm" })
        .then(() => {
          setSkiaWebLoaded(true);
        })
        .catch((err) => console.error(err));
    } else {
      setSkiaWebLoaded(true);
    }
  }, []);

  if (!assetsReady || !skiaWebLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.text}>Loading assets...</Text>
        <ActivityIndicator style={styles.indicator} />
      </View>
    );
  }
  return children;
};

const styles = StyleSheet.create({
  loadingContainer: {
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
