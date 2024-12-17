import React from "react";
import {
  View,
  Text,
  Pressable,
  TextInput,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import Code from "./Code";
import Style from "./Style";

const Comp = ({ onClose }) => {
  const code = Code(onClose);
  const style = Style();

  return (
    <TouchableWithoutFeedback
      onPress={code.handleBackdropPress} // Dismisses only when touching outside
      accessible={false}
    >
      <SafeAreaView style={style.centeredView}>
        <View style={style.modalView}>
          <View style={style.modalHeader}>
            <Text style={style.modalText}>Opret Preset</Text>
          </View>
          <View style={style.modalBody}>
            <TextInput
              placeholder="Insæt navn"
              value={code.nameString}
              onChangeText={code.onNameString} // Update nameString when typing
              style={style.input}
            />
            {code.nameError && <Text style={style.errorText}>{code.nameError}</Text>}
            
            <TextInput
              placeholder="Insæt nummer"
              value={code.numberString}
              onChangeText={code.onNumberString} // Update numberString when typing
              keyboardType="numeric" // Only show numeric keyboard
              style={style.input}
            />
            {code.numberError && <Text style={style.errorText}>{code.numberError}</Text>}
            
            <Pressable
              style={[style.button, style.buttonClose]}
              onPress={code.AddObject}
            >
              <Text style={style.textStyle}>Add Preset</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Comp;
