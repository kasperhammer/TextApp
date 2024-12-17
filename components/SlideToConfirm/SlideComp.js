import React from "react";
import { View, Text, Animated } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign"; // Import the AntDesign icon
import useSlideCode from "./SlideCode";
import useSlideStyle from "./SlideStyle";

const SlideToConfirm = ({ onConfirm }) => {
  const code = useSlideCode(onConfirm);
  const styles = useSlideStyle();

  return (
    <View style={styles.container} onLayout={(e) => code.setSliderWidth(e.nativeEvent.layout.width)}>
      <View style={styles.track}>
     <Text style={styles.test}>Slide To Confirm</Text>
        <Animated.View
          style={[
            styles.slider,
            { transform: [{ translateX: code.slideAnim }] },
          ]}
          {...code.panResponder.panHandlers}
        >
          <View style={styles.addPresetPlus}>
            <AntDesign name="right" size={40} color="white" />
          </View>
        </Animated.View>
      </View>
    </View>
  );
};

export default SlideToConfirm;
