import { useState } from "react";
import { Animated, PanResponder } from "react-native";

const useSlideCode = (onConfirm) => {
  const [slideAnim] = useState(new Animated.Value(0));
  const [sliderWidth, setSliderWidth] = useState(0);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      const newValue = Math.max(0, Math.min(gestureState.dx, sliderWidth - 50)); // Clamp the value
      slideAnim.setValue(newValue);
    },
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dx > sliderWidth * 0.75) {
        // If threshold is passed, confirm the action
        Animated.timing(slideAnim, {
          toValue: sliderWidth - 50,
          duration: 200,
          useNativeDriver: false,
        }).start(() => onConfirm && onConfirm());
      } else {
        // Reset if not slid far enough
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }).start();
      }
    },
  });

  return {
    slideAnim,
    sliderWidth,
    setSliderWidth,
    panResponder,
  };
};

export default useSlideCode;
