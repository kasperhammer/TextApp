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

const Comp = ({ onClose, preset }) => {
  const code = Code(onClose, preset);

  return (
    <TouchableWithoutFeedback
      onPress={code.handleBackdropPress} // Dismisses only when touching outside
      accessible={false}
    >
      <SafeAreaView style={Style.centeredView}>
        <View style={Style.modalView}>
          <View style={Style.modalHeader}>
            <Text style={Style.headerText}>Vælg personer</Text>
          </View>
          <View style={Style.addPresetContainer}>
       
            <TouchableOpacity onPress={code.onSelectAll} style={Style.addPresetButton}>
              {code.selectAll ? (
                <Text style={Style.addPresetText}>Select None</Text>
              ) : (
                <Text style={Style.addPresetText}>Select All</Text>
              )}

              <View style={Style.addPresetPlus}>
                {code.selectAll ? (
                  <AntDesign name="minus" size={40} color="white" /> // Minus when not selected
                ) : (
                  <AntDesign name="check" size={40} color="white" /> // Checkmark when selected
                  
                )}
              </View>
            </TouchableOpacity>
          </View>
          {code.error && (<Text style={Style.errorText}>Du skal vælge minst 1 person</Text>)}
      
          <FlatList
            data={preset.People}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => code.handlePress(index)}
                style={[
                  Style.listItem,
                  code.selectedItemIndex.includes(index) && Style.selectedItem, // Conditional styling
                ]}
              >
                <Text style={Style.listText}>{item.Name}</Text>
              </TouchableOpacity>
            )}
            style={Style.listContainer}
          />

<View style={[Style.addPresetContainer, Style.alignBottom]}>
          <TouchableOpacity
          onPress={code.selectionComple}
            style={Style.addPresetButton}
          >
            <Text style={Style.addPresetText}>Confirm Selection</Text>
            <View style={Style.addPresetPlus}>
              <AntDesign name="plus" size={40} color="white" />
            </View>
          </TouchableOpacity>
        </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Comp;
