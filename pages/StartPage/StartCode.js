import React, { useState } from 'react';
import { Keyboard } from 'react-native';

const useStartCode = () => {
  const [textString , onChangeText] = useState("");
  const dismissKeyboard = () => {Keyboard.dismiss();};
  const [modalVisible, setModalVisible] = useState(false);
    return {
      textString,
      onChangeText,
      dismissKeyboard,
      modalVisible,
      setModalVisible,
 
    };
  };
  
  export default useStartCode;
  