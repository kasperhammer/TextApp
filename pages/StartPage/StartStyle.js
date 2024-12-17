import { StyleSheet } from "react-native";

const useStartStyle = () => {
  return StyleSheet.create({
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
      paddingLeft:10,
      paddingRight:10,
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
      borderColor:'#00B2FF',
      borderRadius:5,
      height:250,
      width:'80%',
      textAlignVertical: 'top',
      fontSize:20,
    },
  });
};

export default useStartStyle;
