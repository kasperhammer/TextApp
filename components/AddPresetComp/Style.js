import { StyleSheet } from "react-native";

const Style = () => {
  return StyleSheet.create({
    centeredView: {
      display: "flex",
      height: 720,
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
      height: 600,
      position: "absolute",
    },
    presetNavn: {
      borderWidth: 2,
      borderColor: "#00B2FF",
      borderRightWidth: 0,
      borderLeftWidth: 0,
      width: 320,
    },
    presetText: {
      textAlign: "center",
      fontSize: 25,
      color: "black",
    },
    button: {
      backgroundColor: "white",
      borderWidth: 1,
      padding: 10,
      elevation: 2,
      marginTop: 15,
      width: 150,
    },

    textStyle: {
      textAlign: "center",
    },

    errorText: {
      color: "red",
      textAlign: "center",
    },
    modalBody: {
      width: 320,
      height: 400,
    },
    input: {
      borderWidth: 1,
      borderColor: "black",
      width: 250,
      marginTop: 15,
      fontSize: 20,
      textAlign: "center",
    },
    modalFooter: {
      flex: 1,
      justifyContent: "flex-end",
    },
    ModalFooterBorder: {
      borderTopWidth: 2,
      borderColor: "#00B2FF",

      width: 320,
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
    listContainer: {
      flexShrink: 1, // Allows it to shrink to the size of its content
      flexGrow: 0, // Prevents it from taking additional space
      maxHeight: 200, // Optional: restrict max height
      width: "100%", // Ensures it spans the full width
    },
    listItem: {
      backgroundColor: "#E7E7E7",
      width: 320,
      alignItems: "center",
      marginTop: 10,
    },
    listText: {
      fontSize: 30,
      fontWeight: "light",
    },
    AddPerson: {
      marginTop: 10,
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      flexGrow: 1, // Allows it to grow and take up remaining space
      flexShrink: 0, // Prevents it from shrinking below its content size
      width: "100%", // Ensures it spans the full width
    },
    headerFlow: {
      justifyContent: "center",
    },
    modalText: {
      marginTop: 10,
      marginBottom: 10,
      fontWeight: "bold",
      fontSize: 20,
      alignSelf:"center",
    },
    centerTrash: {
      padding: 5,
      position: "absolute",
      alignSelf: "flex-end",
    },
    selectedItem: {
      backgroundColor: "#00B2FF", // Selected color
    },
  });
};

export default Style;
