import {
  Canvas,
  Group,
  ImageShader,
  RoundedRect,
  SkImage,
  makeImageFromView,
  rect,
  rrect,
} from "@shopify/react-native-skia";
import React, { useState } from "react";
import {
  Dimensions,
  PixelRatio,
  Pressable,
  StatusBar,
  StyleSheet,
  View,
  ViewProps,
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  interpolate,
  interpolateColor,
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Description from "./airbnb/Description";
import Header from "./airbnb/Header";
import SeeMore from "./airbnb/SeeMore";

const pd = PixelRatio.get();
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const Main = () => {
  const insets = useSafeAreaInsets();

  const viewRef = React.useRef(null);

  const visible = useSharedValue(0);
  const [snapshot, setSnapshot] = useState<SkImage>(null);
  const [sheetHeight, setSheetHeight] = useState(0);

  const show = async () => {
    setSnapshot(await makeImageFromView(viewRef));

    StatusBar.setBarStyle("light-content", true);

    visible.value = withTiming(1, { duration: 300 });
  };

  const hide = async () => {
    StatusBar.setBarStyle("default", true);

    visible.value = withTiming(0, { duration: 300 }, () => {
      runOnJS(setSnapshot)(null);
    });
  };

  const handleModalLayout: ViewProps["onLayout"] = (event) => {
    setSheetHeight(event.nativeEvent.layout.height);
  };

  const snapshotGroupTransform = useDerivedValue(() => {
    const scaleAmount = 0.95;

    const offsetTop = insets.top;
    const maxX = (windowWidth * (1 - scaleAmount)) / 2;
    const maxY = offsetTop;

    const scale = interpolate(
      visible.value,
      [0, 1, 1],
      [1, scaleAmount, scaleAmount]
    );
    const translateX = interpolate(visible.value, [0, 1, 1], [0, maxX, maxX]);
    const translateY = interpolate(visible.value, [0, 1, 1], [0, maxY, maxY]);

    return [
      {
        translateX,
      },
      {
        translateY,
      },
      {
        scale: scale,
      },
    ];
  }, [visible.value, snapshot]);

  const dimmedOverlayAnimationStyle = useAnimatedStyle(
    () => ({
      backgroundColor: interpolateColor(
        visible.value,
        [0, 1],
        ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.5)"]
      ),
    }),
    [visible.value]
  );

  const modalContainerStyle = useAnimatedStyle(
    () => ({
      paddingBottom: insets.bottom + 24,
      transform: [
        {
          translateY: interpolate(
            visible.value,
            [0, 1, 2],
            [windowHeight, 0, -(windowHeight - sheetHeight)]
          ),
        },
      ],
    }),
    [visible.value, insets, sheetHeight]
  );

  const pan = Gesture.Pan()
    .onUpdate((event) => {
      const amplitude = 0.5;
      const translationPercentage = event.translationY / windowHeight;
      visible.value = 1 - translationPercentage * amplitude;
    })
    .onEnd((event) => {
      const threshold = 100;
      if (event.translationY > threshold) {
        runOnJS(hide)();
      } else {
        visible.value = withTiming(1, {
          duration: 300,
        });
      }
    });

  return (
    <>
      <View
        ref={viewRef}
        style={{ flex: 1, backgroundColor: "white" }}
        collapsable={false}
      >
        <Header />
        <Description onSeeMore={show} />
      </View>
      {snapshot && (
        <Canvas style={styles.canvas}>
          <Group transform={snapshotGroupTransform}>
            <ImageShader
              image={snapshot}
              rect={rect(0, 0, windowWidth, windowHeight)}
              fit="fill"
            />
            <RoundedRect
              rect={rrect(rect(0, 0, windowWidth, windowHeight), 8, 8)}
            />
          </Group>
        </Canvas>
      )}
      {snapshot && (
        <GestureDetector gesture={pan}>
          <Pressable style={styles.dimmedOverlay} onPress={hide}>
            <Animated.View
              style={[
                { flex: 1, justifyContent: "flex-end" },
                dimmedOverlayAnimationStyle,
              ]}
            >
              <Animated.View
                style={[styles.modalContainer, modalContainerStyle]}
                onLayout={handleModalLayout}
              >
                <Pressable>
                  <SeeMore />
                </Pressable>
              </Animated.View>
            </Animated.View>
          </Pressable>
        </GestureDetector>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  canvas: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "black",
  },
  dimmedOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  modalContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
});

export { Main };
