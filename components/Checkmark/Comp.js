import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  SafeAreaView,
} from "react-native";
import LottieView from "lottie-react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

const Comp = ({onClose}) => {
  const animation = useRef(null); // Ref for Lottie animation
  const rightPosition = useSharedValue(200); // Start with text off-screen to the right

  useEffect(() => {
    rightPosition.value = withTiming(0, { duration: 1000 }); // Animate 'right' to 0
  }, []);

  // Animated style for the text container
  const textStyle = useAnimatedStyle(() => {
    return {
      right: rightPosition.value, // Animate the 'right' position
    };
  });
  const handleBackdropPress = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
  return (
    <TouchableWithoutFeedback
      onPress={handleBackdropPress} // Dismisses only when touching outside
      accessible={false}
    >
      <SafeAreaView style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.test}>
            <LottieView
              ref={animation}
              autoPlay
              loop={false}
              style={styles.lottie}
              source={require("../../assets/CheckMark.json")}
            />
            <Animated.View style={styles.textContainer}>
              <Animated.Text style={[styles.text, textStyle]}>
                Messages Complete
              </Animated.Text>
            </Animated.View>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    display: "flex",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0000007a",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: "auto",
    position: "absolute",
  },
  lottie: {
    width: 200,
    height: 200,
  },
  textContainer: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    height: 30,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  test: {
    overflow: "hidden",
  },
});

export default Comp;
