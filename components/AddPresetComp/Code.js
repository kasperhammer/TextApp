import { useEffect, useState } from "react";
import { Alert, Keyboard } from "react-native";
import * as Clipboard from 'expo-clipboard';
import Dialog from "react-native-dialog";
const Code = (onClose, preset, onDelete, onUpdate) => {
  const [presetNameString, onPresetNameString] = useState("");
  const [kvps, setKvps] = useState([]); // Use state for kvps array
  const [nameString, onNameString] = useState("");
  const [numberString, onNumberString] = useState("");
  const [nameError, setNameError] = useState("");
  const [numberError, setNumberError] = useState("");
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [presetNameError, setPresetNameError] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editPerson, setEditPerson] = useState(false);
  const [isDialogVisible, setDialogVisible] = useState(false);
  const [dialogInput, setDialogInput] = useState("");

  const handlePress = (index) => {
 
    if (index == selectedItemIndex) {
      setSelectedItemIndex(null);
      onNameString("");
      onNumberString("");
      setEditPerson(false);
    } else {
      let item = kvps[index];
      onNameString(item.name);
      onNumberString(item.number);
      setSelectedItemIndex(index);
      setEditPerson(true);
    }
  };

  const handleLongPress = (index) => {
    setSelectedItemIndex(index); // Set the index of the selected item
    setEditPerson(false);
    Alert.alert(
      "Delete Item",
      "Are you sure you want to delete this item?",
      [
        {
          text: "Cancel",
          onPress: () => setSelectedItemIndex(null),
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => deleteItem(index),
        },
      ],
      { cancelable: false }
    );
  };

  const handleDeletePress = () => {
    Alert.alert(
      "Delete Preset",
      "Are you sure you want to delete this Preset?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => onDelete(preset.Id),
        },
      ],
      { cancelable: false }
    );
  };

  const deleteItem = (index) => {
    const newKvps = [...kvps];
    newKvps.splice(index, 1); // Remove the item at the given index
    setKvps(newKvps);
    setSelectedItemIndex(null); // Clear the selection
  };

  useEffect(() => {
    if (preset != null) {
      setEdit(true);
      onPresetNameString(preset.Name);
      let tempkvps = [];
      for (const person of preset.People) {
        tempkvps.push({ name: person.Name, number: person.PhoneNumber });
      }
      setKvps(tempkvps);
    } else {
      setEdit(false);
    }
  }, []);

  useEffect(() => {
    // Add keyboard event listeners
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => setKeyboardVisible(false)
    );

    return () => {
      // Remove listeners to prevent memory leaks
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const removeKeyboard = () => {
    Keyboard.dismiss(); // Dismiss the keyboard
  };

  const handleBackdropPress = (event) => {
    if (event.target === event.currentTarget) {
      onClose(null, null);
    }
  };

  const AddObject = () => {
    setNameError("");
    setNumberError("");

    let isValid = true;

    // Validate Name
    if (!nameString.trim()) {
      setNameError("Navn er påkrævet");
      isValid = false;
    }

    // Validate Number
    if (!numberString.trim()) {
      setNumberError("Nummer er påkrævet");
      isValid = false;
    } else if (!/^\d+$/.test(numberString)) {
      setNumberError("Kun tal er tilladt");
      isValid = false;
    } else if (numberString.length !== 8) {
      setNumberError("Nummer skal være 8 cifre langt");
      isValid = false;
    }

    if (isValid) {
      if (editPerson) {
        let kvpscopy = kvps;
        kvpscopy[selectedItemIndex].name = nameString;
        kvpscopy[selectedItemIndex].number = numberString;
        setKvps(kvpscopy);
        setEditPerson(false);
        setSelectedItemIndex(null);

      } else {
        // Update the kvps state
        kvps.push({ name: nameString, number: numberString });
        setKvps(kvps);
      }

      // Clear inputs after successful submission
      onNameString("");
      onNumberString("");
      Keyboard.dismiss();
    }
  };

  const AddPreset = () => {
    if (presetNameString == "") {
      setPresetNameError(true);
      return;
    } else {
      setPresetNameError(false);
    }

    if (kvps.length >= 1) {
      if (!edit) {
        onClose(kvps, presetNameString);
      } else {
        onUpdate(preset, presetNameString, kvps);
      }
    }
  };

  const SharePreset = async () => {
    if(edit){
     
      await Clipboard.setStringAsync(JSON.stringify(preset));

    }
  };
  
  const handleDownloadPress = async () => {
    const clipboardContent = await Clipboard.getStringAsync(); // Get clipboard content
    setDialogInput(clipboardContent || ""); // Prefill with clipboard content
    setDialogVisible(true); // Show the dialog
  };
  
  const handleDialogCancel = () => {
    setDialogVisible(false); // Hide the dialog
  };

  const handleDialogConfirm = () => {
    try {
      const importedPreset = JSON.parse(dialogInput); // Parse the JSON input
      onPresetNameString(importedPreset.Name);
      tempkvps = [];
      for(const pers of importedPreset.People){
        tempkvps.push({ name: pers.Name, number: pers.PhoneNumber });
      }
      setKvps(tempkvps);
      setDialogVisible(false); // Close the dialog
      Alert.alert("Success", "Preset imported successfully!");
    } catch (error) {
      Alert.alert("Error", "Invalid preset format. Please check your input.");
    }
  };

  return {
    nameString,
    onNameString,
    numberString,
    onNumberString,
    nameError,
    numberError,
    handleBackdropPress,
    handleLongPress,
    deleteItem,
    AddObject,
    kvps,
    isKeyboardVisible,
    setKeyboardVisible,
    presetNameString,
    onPresetNameString,
    selectedItemIndex,
    removeKeyboard,
    handlePress,
    AddPreset,
    presetNameError,
    handleDeletePress,
    edit,
    editPerson,
    SharePreset,
    handleDownloadPress,
    isDialogVisible,
    dialogInput,
    setDialogInput,
    handleDialogCancel,
    handleDialogConfirm,

  };
};

export default Code;
