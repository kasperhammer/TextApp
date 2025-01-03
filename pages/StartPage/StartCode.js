import React, { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';

import { ColorSpace } from 'react-native-reanimated';

const useStartCode = () => {
  const [textString , onChangeText] = useState("");
  const dismissKeyboard = () => {Keyboard.dismiss();};
  const [modalVisible, setModalVisible] = useState(false);
  
  const [rows, setRows] = useState([]);
 

  useEffect(() => {
    const getData = async () => {
      console.log("Fetching data...");
      try{
     
        let fetchedRows = await global.serviceCode.GetPresets(); // Fetch rows
        console.log("Fetched data:", fetchedRows); // Logs the fetched data
      }catch(e){
        console.log(e);
      }
    
    };
  
    getData(); 
  }, []); // Runs once on mount

  function AddPreset(kvps,name)
  {
    setModalVisible(false);
    if(kvps != null && name != null){
      serviceCode.CreatePreset(kvps,name);
    }

  }


    return {
      textString,
      onChangeText,
      dismissKeyboard,
      modalVisible,
      setModalVisible,
      AddPreset,
    };
  };
  
  export default useStartCode;