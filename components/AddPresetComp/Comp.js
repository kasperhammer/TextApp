import React from "react";
import { View,Text, Pressable } from "react-native";

import Code from "./Code";
import Style from "./Style";

const Comp = ({onClose}) => {
  const code = Code();
  const style = Style();

  return (
    <View style={style.centeredView}>
    <View style={style.modalView}>
      <Text style={style.modalText}>Hello World!</Text>
      <Pressable
                style={[style.button, style.buttonClose]}
                onPress={onClose}>
                <Text style={style.textStyle}>Hide Modal</Text>
              </Pressable>
    </View>
  </View>
  );
};

export default Comp;
