import { useEffect, useState } from "react";
import { Alert, Keyboard } from "react-native";

const Code = (onClose) => {
  const [presetNameString, onPresetNameString] = useState("");
  const [kvps, setKvps] = useState([]); // Use state for kvps array
  const [nameString, onNameString] = useState("");
  const [numberString, onNumberString] = useState("");
  const [nameError, setNameError] = useState("");
  const [numberError, setNumberError] = useState("");
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);


  const handlePress = (index) => {
    let item = kvps[index];
    onNameString(item.name);
    onNumberString(item.number);
 
  };

  const handleLongPress = (index) => {
    setSelectedItemIndex(index); // Set the index of the selected item
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

  const deleteItem = (index) => {
    const newKvps = [...kvps];
    newKvps.splice(index, 1); // Remove the item at the given index
    setKvps(newKvps);
    setSelectedItemIndex(null); // Clear the selection
  };

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
    console.log("Close");
    if (event.target === event.currentTarget) {
      onClose();
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
      // Update the kvps state
      kvps.push({ name: nameString, number: numberString });
      setKvps(kvps);

      // Clear inputs after successful submission
      onNameString("");
      onNumberString("");
      Keyboard.dismiss();
    }
};

const AddPreset = () => {
  console.log("button Pressed");
  onClose(kvps,presetNameString);
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
    AddPreset
  };
};

export default Code;
