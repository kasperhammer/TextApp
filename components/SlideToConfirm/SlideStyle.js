import { StyleSheet } from "react-native";

const useSlideStyle = () => {
  return StyleSheet.create({
    container: {
      width: "70%",
      alignSelf: "center",
      marginVertical: 20,
    },
    label: {
      textAlign: "center",
      marginBottom: 10,
      fontSize: 16,
      color: "#666",
    },
    track: {
      borderWidth: 1,
      borderColor: "#00B2FF",
      borderRadius: 5,
      height: 50,
      overflow: "hidden",
      justifyContent: "center",
      position: "relative", // Ensure child elements can overlap
    },
    slider: {
      height: 50,
      width: 50,
      borderRadius: 25,
      justifyContent: "center",
      alignItems: "center",
    },
    addPresetPlus: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#00B2FF",
      height: 50,
      width: 50,
      borderRadius: 5,
      zIndex: 2, // Ensure the button sits on top
    },
    sliderText: {
      color: "#fff",
      fontSize: 20,
      fontWeight: "bold",
    },
    trackText: {
      position: "absolute", // Position the text above the slider
      width: "100%", // Center the text within the track
      textAlign: "center",
      fontSize: 16,
      color: "#666", // Subtle color for contrast against the slider
      zIndex: 1, // Ensure the text is above the track background
    },
    test:{
        position: "absolute",
        textAlign: "center",
        color: "#666",
        fontSize: 16,
        width: "100%",
    },
  });
};

export default useSlideStyle;
