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
import Dialog from "react-native-dialog";
const Comp = ({ onClose, preset, onDelete, onUpdate }) => {
  const code = Code(onClose, preset, onDelete, onUpdate);

  return (
    <TouchableWithoutFeedback
      onPress={code.handleBackdropPress} // Dismisses only when touching outside
      accessible={false}
    >
      <SafeAreaView style={Style.centeredView}>
        <TouchableWithoutFeedback onPress={code.removeKeyboard}>
          <View style={Style.modalView}>
            <View style={Style.modalHeader}>
              {code.edit && (
                <View style={Style.headerFlow}>
                  <TouchableOpacity
                    onPress={code.SharePreset}
                    style={Style.centerTrash}
                  >
                    <View>
                      <AntDesign name="sharealt" size={30} color="black" />
                    </View>
                  </TouchableOpacity>

                  <Text style={Style.modalText}>Opret Preset</Text>

                  <TouchableOpacity
                    onPress={code.handleDeletePress}
                    style={Style.centerTrash}
                  >
                    <View>
                      <AntDesign name="delete" size={30} color="black" />
                    </View>
                  </TouchableOpacity>
                </View>
              )}
              {!code.edit && (
                <View style={Style.altheader}>
                  <Text style={Style.modalText}>Opret Preset</Text>
                  <TouchableOpacity
                    style={Style.download}
                    onPress={code.handleDownloadPress} // Call the download handler
                  >
                    <View>
                      <AntDesign name="download" size={30} color="black" />
                    </View>
                  </TouchableOpacity>

                  <Dialog.Container visible={code.isDialogVisible}>
                    <Dialog.Title>Import Preset</Dialog.Title>
                    <Dialog.Description>
                      Paste your preset below to import it.
                    </Dialog.Description>
                    <Dialog.Input
                      placeholder="Paste your preset here..."
                      value={code.dialogInput}
                      onChangeText={code.setDialogInput}
                      multiline
                    />
                    <Dialog.Button
                      label="Cancel"
                      onPress={code.handleDialogCancel}
                    />
                    <Dialog.Button
                      label="Import"
                      onPress={code.handleDialogConfirm}
                    />
                  </Dialog.Container>
                </View>
              )}

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
                  <Text style={Style.textStyle}>
                    {" "}
                    {code.editPerson ? "Rediger Person" : "Tilføj Person"}
                  </Text>
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
