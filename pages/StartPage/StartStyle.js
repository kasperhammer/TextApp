import { StyleSheet } from "react-native";

const Style = StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      backgroundColor: "#00B2FF",
      padding: 5,
      alignItems: "center",
    },
    headerText: {
      color: "#fff",
      fontSize: 50,
      fontWeight: "bold",
    },
    addPresetContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginVertical: 10,
    },
    addPresetButton: {
      flexDirection: "row",
      alignItems: "center",
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: "#00B2FF",
      borderRadius: 5,
      height: 50,
    },
    addPresetText: {
      color: "#00B2FF",
      fontSize: 30,
      paddingLeft: 10,
      paddingRight: 10,
    },
    addPresetPlus: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",

      backgroundColor: "#00B2FF",
      height: 50,
      width: 50,
      borderTopRightRadius: 5,
      borderBottomRightRadius: 5,
    },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      borderColor: "#00B2FF",
      borderRadius: 5,
      height: 250,
      width: "80%",
      textAlignVertical: "top",
      fontSize: 20,
    },
    listContainer: {
      flexShrink: 1, // Allows it to shrink to the size of its content
      flexGrow: 0, // Prevents it from taking additional space
      maxHeight: 200, // Optional: restrict max height
      width: "100%", // Ensures it spans the full width
    },
    listItem: {
      backgroundColor: "#E7E7E7",
      width: "100%",
      alignItems: "center",
      marginTop: 10,
    },
    listText: {
      fontSize: 30,
      fontWeight: "light",
    },
    selectedItem: {
      backgroundColor: "#00B2FF", // Selected color
    },
    spacing: {
      marginTop: 10,
      borderBottomWidth: 2,
      width: "100%",
      borderColor: "#00B2FF",
    },
    errorCode: {
      color: "red",
      textAlign: "center",
      fontWeight: "bold",
    },
    listView: {
      height: 180,
    },
  });


export default Style;
