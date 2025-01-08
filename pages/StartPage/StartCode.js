import React, { useEffect, useState } from "react";
import { Keyboard } from "react-native";
import { ColorSpace } from "react-native-reanimated";
import * as SMS from "expo-sms";

const useStartCode = () => {
  const [textString, onChangeText] = useState("");
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null); // Track selected index
  const [rows, setRows] = useState([]);
  const [selectedPreset, setSelectedPreset] = useState(null);
  const [errorCode, setErrorCode] = useState(false);
  const [errorText, setErrorText] = useState(false);
  const [isTyping, setisTyping] = useState(false);
  const [customPreset, setCustomPreset] = useState(null);
  var lastTap = Date.now();

  const sendSms = async () => {
    if (selectedIndex == null) {
      console.log("Preset Error");
      setErrorCode(true);
      return;
    }

    if (textString == "") {
      console.log("Text Error");
      setErrorText(true);
      return;
    }

    let people = null;
    if (customPreset != null) {
      people = customPreset.People;
    } else {
      people = await serviceCode.GetPeopleFromPreset(rows[selectedIndex].Id);
    }

    for (const person of people) {
      // Replace ## with the person's Name in the textString
      const personalizedText = textString.replace(/##/g, person.Name);

      // Send the SMS with the personalized message
      const { result } = await SMS.sendSMSAsync(
        [person.PhoneNumber],
        personalizedText
      );
    }
    onChangeText("");
  };

  const handlePress = async (index) => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300; // 300ms for double tap detection

    //register if double tap occur
    if (lastTap && now - lastTap < DOUBLE_TAP_DELAY) {
      // It's a double-tap
      //The Action should ony be registered if a double tap occurs on an
      //already selected item
      if (selectedIndex == null) {
        setSelectedIndex(index);
        console.log(`Double-tap detected on item ${index}`);

        let people = await serviceCode.GetPeopleFromPreset(rows[index].Id);

        let preset = {
          Id: rows[index].Id,
          Name: rows[index].Name,
          People: people,
        };
        setSelectedPreset(preset);
        setModalVisible1(true);
        // Add your double-tap action here
      }
    } else {
      //if Not set time of tap, to register time diffrence
      lastTap = now;
      setCustomPreset(null);
      //Logic to either select or deselect item in list
      if (index == selectedIndex) {
        setSelectedIndex(null);
      } else {
        setSelectedIndex(index); // Set the selected index
        setErrorCode(false);
      }
    }
  };

  const handleLongPress = async (index) => {
    let people = await serviceCode.GetPeopleFromPreset(rows[index].Id);
    let preset = { Id: rows[index].Id, Name: rows[index].Name, People: people };
    setSelectedPreset(preset);
    setModalVisible(true);
  };

  const getData = async () => {
    console.log("Fetching data...");
    try {
      let fetchedRows = await global.serviceCode.GetPresets(); // Fetch rows
      setRows(fetchedRows);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (errorText) {
      if (textString != "") {
        setErrorText(false);
      }
    }
  }, [textString]);

  useEffect(() => {
    getData();
  }, []); // Runs once on mount

  const AddPreset = async (kvps, name) => {
    setModalVisible(false);
    if (kvps != null && name != null) {
      await serviceCode.CreatePreset(kvps, name);
      let fetchedRows = await global.serviceCode.GetPresets(); // Fetch rows
      setRows(fetchedRows);
    }
  };

  const DeletePreset = async (presetId) => {
    await serviceCode.DeletePreset(presetId);
    setModalVisible(false);
    getData();
  };

  const UpdatePreset = async (preset, presetName, kvps) => {
    setModalVisible(false);
    if (preset.Name != presetName) {
      if (serviceCode.UpdatePreset(preset.Id, presetName)) {
        let tempRows = rows;
        for (const pre of tempRows) {
          if (pre.Id == preset.Id) {
            pre.Name = presetName;
            break;
          }
        }
        setRows(tempRows);
      }
    }
    for (const person of preset.People) {
      let match = false;
      for (const item of kvps) {
        if (person.Name == item.name) {
          match = true;
          break;
        }
        if (person.PhoneNumber == item.number) {
          match = true;
          break;
        }
      }
      if (!match) {
        await serviceCode.DeletePerson(person.Id);
      }
    }
    for (let i = 0; i < kvps.length; i++) {
      let match = false;
      for (const person of preset.People) {
        if (
          person.Name == kvps[i].name &&
          person.PhoneNumber == kvps[i].number
        ) {
          //No Change needed.
          match = true;
          break;
        }

        if (
          person.PhoneNumber == kvps[i].number &&
          person.Name != kvps[i].name
        ) {
          match = true;
          await serviceCode.UpdatePerson({
            Id: person.Id,
            Name: kvps[i].name,
            Number: kvps[i].number,
          });
          //Update Persons name
          break;
        }
        if (
          person.PhoneNumber != kvps[i].number &&
          person.Name == kvps[i].name
        ) {
          match = true;
          await serviceCode.UpdatePerson({
            Id: person.Id,
            Name: kvps[i].name,
            Number: kvps[i].number,
          });
          //Update Persons number
          break;
        }
      }
      if (!match) {
        await serviceCode.AddPerson(
          { Name: kvps[i].name, Number: kvps[i].number },
          preset.Id
        );
        //Add person to DB
      }
    }
  };

  const SelectPeopleClose = (newPreset) => {
    console.log(newPreset);
    if (newPreset != null) {
      setCustomPreset(newPreset);
    }else{
      setCustomPreset(null);
    }
  
    setModalVisible1(false);
  };

  return {
    textString,
    onChangeText,
    dismissKeyboard,
    modalVisible,
    setModalVisible,
    modalVisible1,
    setModalVisible1,
    AddPreset,
    rows,
    handlePress,
    selectedIndex,
    selectedPreset,
    handleLongPress,
    setSelectedPreset,
    DeletePreset,
    UpdatePreset,
    sendSms,
    errorCode,
    errorText,
    isTyping,
    setisTyping,
    SelectPeopleClose,
  };
};

export default useStartCode;
