import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  Easing,
} from "react-native-reanimated";
import TabBarButton from "./TabBarButton";

const TAB_ITEMS = [
  {
    label: "Home",
    icon: require("./lottie/home.json"),
    path: "morph-home-2",
  },
  {
    label: "Drive",
    icon: require("./lottie/drive.json"),
    path: "hover-assignment",
  },
  {
    label: "Group",
    icon: require("./lottie/group.json"),
    path: "hover-attribution",
  },
  {
    label: "Setting",
    icon: require("./lottie/setting.json"),
    path: "hover-cog-1",
  },
];

const TabBar = () => {
  const [currentIndex, setCurrentIndex] = useState(null);
  const svRotateY = useSharedValue(0);
  const config = {
    duration: 150,
    easing: Easing.linear,
    mass: 0.1,
  };

  const tabBarAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ perspective: 1000 }, { rotateY: `${svRotateY.value}deg` }],
    };
  });

  const handleOnPress = (index) => {
    const ry = index < TAB_ITEMS.length / 2 ? -10 : 10;

    setCurrentIndex(index);
    svRotateY.value = withSpring(ry, config, (finished) => {
      if (finished) {
        svRotateY.value = withSpring(0);
      }
    });
  };

  const handleTouchOnPress = () => {
    setCurrentIndex(null);
    svRotateY.value = withSpring(0);
  };

  return (
    <ImageBackground
      source={require("./assets/background.jpg")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <TouchableWithoutFeedback
        style={styles.container}
        onPress={handleTouchOnPress}
      >
        <View style={[styles.container, { flex: 1, alignItems: "center" }]}>
          <Animated.View style={[styles.tabBar, tabBarAnimatedStyle]}>
            {TAB_ITEMS.map((tab, index) => (
              <TabBarButton
                key={`tab-button-${index}`}
                label={tab.label}
                active={currentIndex === index}
                onPress={() => handleOnPress(index)}
                icon={tab.icon}
                iconPath={tab.path}
              />
            ))}
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 12,
  },
  tabBar: {
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 30.0,
    paddingHorizontal: 26,
    shadowColor: "#B78DE4",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
});
