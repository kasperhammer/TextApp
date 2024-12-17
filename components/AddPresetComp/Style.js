import { StyleSheet } from "react-native";

const Style = () => {
  return StyleSheet.create({
   
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:'#0000007a',
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
 
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    modalHeader: {
      borderStyle: "solid",
      borderWidth: 0,
      borderBottomWidth:2,
      borderColor: "#00B2FF",
      width:'100%',
    
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
      fontWeight:'bold',
      fontSize:20,
  
    },
    errorText : {
      color:'red',
    }
    
  });
};

export default Style;
