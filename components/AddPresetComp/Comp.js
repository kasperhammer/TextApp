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
 

  
  return (
    <TouchableWithoutFeedback
      onPress={code.handleBackdropPress} // Dismisses only when touching outside
      accessible={false}
    >
      <SafeAreaView style={Style.centeredView}>
        <TouchableWithoutFeedback onPress={code.removeKeyboard}>
          <View style={Style.modalView}>
            <View style={Style.modalHeader}>
              <View style={Style.headerFlow}>
                <Text style={Style.modalText}>Opret Preset</Text>
                {code.edit && (
                  <TouchableOpacity
                    onPress={code.handleDeletePress}
                    style={Style.centerTrash}
                  >
                    <View>
                      <AntDesign name="delete" size={30} color="black" />
                    </View>
                  </TouchableOpacity>
                )}
              </View>
              <View style={Style.presetNavn}>
                <TextInput
                  value={code.presetNameString}
                  onChangeText={code.onPresetNameString}
                  style={Style.presetText}
                  placeholder="Insæt preset navn"
                  cursorColor={"black"}
                />
              </View>
              {code.presetNameError && (
                <Text style={Style.errorText}>Du skal navngive dit preset</Text>
              )}
            </View>
            <View style={Style.modalBody}>
              {!code.isKeyboardVisible && (
                <FlatList
                  data={code.kvps}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item, index }) => (
                    <TouchableOpacity
                      onPress={() => code.handlePress(index)}
                      onLongPress={() => code.handleLongPress(index)}
                      style={[
                        Style.listItem,
                        code.selectedItemIndex === index && Style.selectedItem, // Conditional styling
                      ]}
                    >
                      <Text style={Style.listText}>{item.name}</Text>
                    </TouchableOpacity>
                  )}
                  style={Style.listContainer}
                />
              )}

              <View style={Style.AddPerson}>
                <TextInput
                  placeholder="Insæt navn"
                  value={code.nameString}
                  cursorColor={"black"}
                  onChangeText={code.onNameString} // Update nameString when typing
                  style={Style.input}
                />
                {code.nameError && (
                  <Text style={Style.errorText}>{code.nameError}</Text>
                )}

                <TextInput
                  placeholder="Insæt mobilnummer"
                  value={code.numberString}
                  cursorColor={"black"}
             
                  onChangeText={code.onNumberString} // Update numberString when typing
                  keyboardType="numeric" // Only show numeric keyboard
                  style={Style.input}
                />
                {code.numberError && (
                  <Text style={Style.errorText}>{code.numberError}</Text>
                )}

                <TouchableOpacity
                  style={[Style.button]}
                  onPress={code.AddObject}
                >

                  <Text style={Style.textStyle}>    {code.editPerson ? "Rediger Person" : "Tilføj Person"}</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={Style.modalFooter}>
              <View style={Style.ModalFooterBorder}>
                <View style={Style.addPresetContainer}>
                  <TouchableOpacity
                    style={Style.addPresetButton}
                    onPress={code.AddPreset} // Correctly call the function
                  >
                    <Text style={Style.addPresetText}>Confirm Preset</Text>
                    <View style={Style.addPresetPlus}>
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
