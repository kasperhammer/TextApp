import React, { useState } from 'react';
import { Keyboard } from 'react-native';
import ServiceCode from '../../service/ServiceCode';

const useStartCode = () => {
  const [textString , onChangeText] = useState("");
  const dismissKeyboard = () => {Keyboard.dismiss();};
  const [modalVisible, setModalVisible] = useState(false);
  const serviceCode = ServiceCode();

  function AddPreset(kvps,name)
  {
    setModalVisible(false);
    
    serviceCode.CreatePreset(kvps,name);
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
  