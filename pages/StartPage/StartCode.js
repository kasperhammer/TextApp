import React, { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';

import { ColorSpace } from 'react-native-reanimated';

const useStartCode = () => {
  const [textString , onChangeText] = useState("");
  const dismissKeyboard = () => {Keyboard.dismiss();};
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null); // Track selected index
  const [rows, setRows] = useState([]);
 const [selectedPreset,setSelectedPreset] = useState(null);
 

  const handlePress = (index) => {
    if(index == selectedIndex){
      setSelectedIndex(null);
    }else{
      setSelectedIndex(index); // Set the selected index
    }
  
  };

const handleLongPress = async (index) => {
  let people = await serviceCode.GetPeopleFromPreset(rows[index].Id);
  let preset = {Id: rows[index].Id,Name: rows[index].Name,People: people};
  setSelectedPreset(preset);
  setModalVisible(true);

};

  useEffect(() => {
    const getData = async () => {
      console.log("Fetching data...");
      try{
      
        let fetchedRows = await global.serviceCode.GetPresets(); // Fetch rows
        setRows(fetchedRows);
      }catch(e){
        console.log(e);
      }
    
    };
  
    getData(); 
  }, []); // Runs once on mount

  

  async function AddPreset(kvps,name)
  {
    setModalVisible(false);
    if(kvps != null && name != null){
      await serviceCode.CreatePreset(kvps,name);
      let fetchedRows = await global.serviceCode.GetPresets(); // Fetch rows
      setRows(fetchedRows);
    }

  }


    return {
      textString,
      onChangeText,
      dismissKeyboard,
      modalVisible,
      setModalVisible,
      AddPreset,
      rows,
      handlePress,
      selectedIndex,
      selectedPreset,
      handleLongPress,
      setSelectedPreset,
    };
  };
  
  export default useStartCode;