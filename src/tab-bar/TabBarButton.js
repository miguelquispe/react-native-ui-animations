import { Pressable, StyleSheet, View } from "react-native";
import React from "react";
import Animated, {
  Easing,
  interpolateColor,
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import LottieView from "lottie-react-native";

const ALottieView = Animated.createAnimatedComponent(LottieView);

const colors = ["#333333", "#f72585"];

const config = {
  duration: 250,
  easing: Easing.linear,
};

const TabBarButton = ({ active, label, onPress, icon, iconPath }) => {
  const iconProgress = useDerivedValue(() => {
    return active
      ? withTiming(1, { duration: 750, easing: Easing.linear })
      : withTiming(0);
  }, [active]);

  const animatedCircleStyle = useAnimatedStyle(() => {
    const opacitySequence = withSequence(
      withTiming(0.3, config),
      withTiming(0, config)
    );
    const scaleSequence = withSequence(withSpring(0.5), withSpring(1));

    return {
      opacity: active ? opacitySequence : 0,

      transform: [
        {
          scale: active ? scaleSequence : 0.6,
        },
      ],
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    const ty = active ? -12 : 20;

    return {
      color: interpolateColor(iconProgress.value, [0, 1], colors),
      transform: [{ translateY: withTiming(ty) }],
    };
  });

  const animatedLottieStyle = useAnimatedStyle(() => {
    const ty = active ? -5 : 0;
    const wh = active ? 0.8 : 1;

    return {
      transform: [
        { translateY: withSpring(ty) },
        {
          scale: withSpring(wh),
        },
      ],
    };
  });

  const animatedProps = useAnimatedProps(() => {
    return {
      progress: iconProgress.value,
    };
  }, [active]);

  return (
    <Pressable onPress={onPress} style={[styles.button]}>
      <View style={styles.labelWrap}>
        {icon && (
          <ALottieView
            loop={false}
            source={icon}
            style={[
              {
                width: 32,
                height: 32,
              },
              animatedLottieStyle,
            ]}
            animatedProps={animatedProps}
            colorFilters={[
              {
                keypath: iconPath,
                color: active ? colors[1] : colors[0],
              },
            ]}
          />
        )}
        <Animated.Text style={[styles.buttonLabel, animatedTextStyle]}>
          {label}
        </Animated.Text>
      </View>
      <Animated.View style={[styles.bubble, animatedCircleStyle]} />
    </Pressable>
  );
};

export default TabBarButton;

const styles = StyleSheet.create({
  button: {
    position: "relative",
    width: 80,
    height: 80,
  },
  buttonLabel: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    fontSize: 12,
    fontWeight: "600",
    color: colors[0],
    textAlign: "center",
  },
  labelWrap: {
    overflow: "hidden",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  bubble: {
    position: "absolute",
    top: 0,
    height: "100%",
    width: "100%",
    backgroundColor: "#ccc",
    borderRadius: 40,
    zIndex: -1,
  },
});
