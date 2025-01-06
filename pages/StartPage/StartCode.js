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

const getData = async () => {
  console.log("Fetching data...");
  try{
  
    let fetchedRows = await global.serviceCode.GetPresets(); // Fetch rows
    setRows(fetchedRows);
  }catch(e){
    console.log(e);
  }

};

  useEffect(() => {
    getData(); 
  }, []); // Runs once on mount

  
  const AddPreset = async(kvps,name) =>
  {
    setModalVisible(false);
    if(kvps != null && name != null){
      await serviceCode.CreatePreset(kvps,name);
      let fetchedRows = await global.serviceCode.GetPresets(); // Fetch rows
      setRows(fetchedRows);
    }

  }

  const DeletePreset = async (presetId) => {
    await serviceCode.DeletePreset(presetId);
    setModalVisible(false);
    getData(); 
  }

  const UpdatePreset = async (preset,presetName,kvps) => {
    setModalVisible(false);
    if(preset.Name != presetName){
      if(serviceCode.UpdatePreset(preset.Id,presetName)){
        let tempRows = rows;
        for (const pre of tempRows) {
          if(pre.Id == preset.Id){
            pre.Name = presetName;
            break;
          }
        }
        setRows(tempRows);
      }
    }
    for(const person of preset.People){
      let match = false;
      for(const item of kvps){
        if(person.Name == item.name){
          match = true;
          break;
        }
        if(person.PhoneNumber == item.number){
          match = true;
          break;
        }
      }
      if(!match){
       await serviceCode.DeletePerson(person.Id);
      }
    }
    for (let i = 0; i < kvps.length; i++) {
      let match = false;
      for (const person of preset.People) {
        if(person.Name == kvps[i].name && person.PhoneNumber == kvps[i].number){
          //No Change needed.
          match = true;
          break;
        }

        if(person.PhoneNumber == kvps[i].number && person.Name != kvps[i].name){
          match = true;
          await serviceCode.UpdatePerson({Id:person.Id,Name:kvps[i].name,Number:kvps[i].number});
          //Update Persons name
          break;
  
        }
        if(person.PhoneNumber != kvps[i].number && person.Name == kvps[i].name){
          match = true;
          await serviceCode.UpdatePerson({Id:person.Id,Name:kvps[i].name,Number:kvps[i].number});
          //Update Persons number
          break;

        }
      }
      if(!match){
        await serviceCode.AddPerson({Name: kvps[i].name,Number: kvps[i].number},preset.Id);
        //Add person to DB
      }
    }
 
  };


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
      DeletePreset,
      UpdatePreset,
    };
  };
  
  export default useStartCode;