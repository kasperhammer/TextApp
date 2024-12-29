import React from "react";
import {
  View,
  Text,
  Pressable,
  TextInput,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Alert,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign"; // Import the AntDesign icon
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
            <View>
              <Text style={style.modalText}>Opret Preset</Text>
            </View>
            <View style={style.presetNavn}>
              <TextInput
                style={style.presetText}
                placeholder="Insæt preset navn"
              />
            </View>
          </View>

          <View style={style.modalBody}>
            <TextInput
              placeholder="Insæt navn"
              value={code.nameString}
              onChangeText={code.onNameString} // Update nameString when typing
              style={style.input}
            />
            {code.nameError && (
              <Text style={style.errorText}>{code.nameError}</Text>
            )}

            <TextInput
              placeholder="Insæt mobilnummer"
              value={code.numberString}
              onChangeText={code.onNumberString} // Update numberString when typing
              keyboardType="numeric" // Only show numeric keyboard
              style={style.input}
            />
            {code.numberError && (
              <Text style={style.errorText}>{code.numberError}</Text>
            )}

            <TouchableOpacity style={[style.button]} onPress={code.AddObject}>
              <Text style={style.textStyle}>Tilføj Person</Text>
            </TouchableOpacity>
          </View>

          <View style={style.modalFooter}>
            <View style={style.ModalFooterBorder}>
              <View style={style.addPresetContainer}>
                <TouchableOpacity
                  onPress={() => code.setModalVisible(!code.modalVisible)}
                  style={style.addPresetButton}
                >
                  <Text style={style.addPresetText}>Confirm Preset</Text>
                  <View style={style.addPresetPlus}>
                    <AntDesign name="plus" size={40} color="white" />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Comp;
