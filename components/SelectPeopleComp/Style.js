import { StyleSheet } from "react-native";

const Style = StyleSheet.create({
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
      width:320,
      position: "absolute",
    },
    modalHeader:{
      borderBottomWidth:2,
      borderColor:"#00B2FF",
    },
    headerText:{
      textAlign:"center",
      width:320,
      padding:10,
      fontSize: 25,
      color: "black",
    }, listContainer: {
      flexShrink: 1, // Allows it to shrink to the size of its content
      flexGrow: 0, // Prevents it from taking additional space
      maxHeight: "65%", // Optional: restrict max height
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
      height: 45,
    },
    addPresetText: {
      color: "#00B2FF",
      fontSize: 25,
      paddingLeft: 10,
      paddingRight: 10,
    },
    addPresetPlus: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",

      backgroundColor: "#00B2FF",
      height: 45,
      width: 45,
      borderTopRightRadius: 5,
      borderBottomRightRadius: 5,
    },alignBottom:{

      position:"absolute",
      bottom:0,
    },
    errorText: {
      color: "red",
      textAlign: "center",
    },
  });


export default Style;
