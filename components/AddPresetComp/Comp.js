import React from "react";
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign"; // Import the AntDesign icon
import Code from "./Code";
import Style from "./Style";

const Comp = ({ onClose, preset, onDelete,onUpdate }) => {
  const code = Code(onClose, preset, onDelete,onUpdate);
  const style = Style();

  
  return (
    <TouchableWithoutFeedback
      onPress={code.handleBackdropPress} // Dismisses only when touching outside
      accessible={false}
    >
      <SafeAreaView style={style.centeredView}>
        <TouchableWithoutFeedback onPress={code.removeKeyboard}>
          <View style={style.modalView}>
            <View style={style.modalHeader}>
              <View style={style.headerFlow}>
                <Text style={style.modalText}>Opret Preset</Text>
                {code.edit && (
                  <TouchableOpacity
                    onPress={code.handleDeletePress}
                    style={style.centerTrash}
                  >
                    <View>
                      <AntDesign name="delete" size={30} color="black" />
                    </View>
                  </TouchableOpacity>
                )}
              </View>
              <View style={style.presetNavn}>
                <TextInput
                  value={code.presetNameString}
                  onChangeText={code.onPresetNameString}
                  style={style.presetText}
                  placeholder="Insæt preset navn"
                />
              </View>
              {code.presetNameError && (
                <Text style={style.errorText}>Du skal navngive dit preset</Text>
              )}
            </View>
            <View style={style.modalBody}>
              {!code.isKeyboardVisible && (
                <FlatList
                  data={code.kvps}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item, index }) => (
                    <TouchableOpacity
                      onPress={() => code.handlePress(index)}
                      onLongPress={() => code.handleLongPress(index)}
                      style={[
                        style.listItem,
                        code.selectedItemIndex === index && style.selectedItem, // Conditional styling
                      ]}
                    >
                      <Text style={style.listText}>{item.name}</Text>
                    </TouchableOpacity>
                  )}
                  style={style.listContainer}
                />
              )}

              <View style={style.AddPerson}>
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

                <TouchableOpacity
                  style={[style.button]}
                  onPress={code.AddObject}
                >

                  <Text style={style.textStyle}>    {code.editPerson ? "Rediger Person" : "Tilføj Person"}</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={style.modalFooter}>
              <View style={style.ModalFooterBorder}>
                <View style={style.addPresetContainer}>
                  <TouchableOpacity
                    style={style.addPresetButton}
                    onPress={code.AddPreset} // Correctly call the function
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
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Comp;
