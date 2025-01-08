import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  styleheet,
  ScrollView,
  TouchableWithoutFeedback,
  Button,
  Alert,
  Modal,
  Pressable,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { SafeAreaView } from "react-native-safe-area-context";
import useStartCode from "./StartCode";
import Style from "./StartStyle";
import AddPresetComp from "../../components/AddPresetComp/Comp";
import SelectPeopleComp from "../../components/SelectPeopleComp/Comp";
import SlideToConfirm from "../../components/SlideToConfirm/SlideComp";
import { FlatList } from "react-native-gesture-handler";

//Mangler Confirm animation når man har skrevet til alle på listen.
//Del presets med andre
//Man skal kunne vedhæfte filer/billeder

const StartPage = () => {
  const code = useStartCode();

  return (
    <TouchableWithoutFeedback onPress={code.dismissKeyboard}>
      <SafeAreaView style={Style.container}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={code.modalVisible}
          onRequestClose={() => {
            code.setModalVisible(!code.modalVisible); // Corrected reference
          }}
        >
          <AddPresetComp
            onClose={code.AddPreset}
            preset={code.selectedPreset}
            onDelete={code.DeletePreset}
            onUpdate={code.UpdatePreset}
          ></AddPresetComp>
        </Modal>

        <Modal
          animationType="fade"
          transparent={true}
          visible={code.modalVisible1}
          onRequestClose={() => {
            code.setModalVisible1(!code.modalVisible1); // Corrected reference
          }}
        >
          <SelectPeopleComp
            onClose={code.SelectPeopleClose}
            preset={code.selectedPreset}
          ></SelectPeopleComp>
        </Modal>

        <View style={Style.header}>
          <Text style={Style.headerText}>EasyText</Text>
        </View>
        {!code.isTyping && (
          <View style={Style.listView}>
            <FlatList
              data={code.rows}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  onPress={() => code.handlePress(index)}
                  onLongPress={() => code.handleLongPress(index)}
                  style={[
                    Style.listItem,
                    code.selectedIndex === index && Style.selectedItem, // Conditional styling
                  ]}
                >
                  <Text style={Style.listText}>{item.Name}</Text>
                </TouchableOpacity>
              )}
              style={Style.listContainer}
            />

            <View style={Style.spacing}></View>
          </View>
        )}

        {code.errorCode && (
          <Text style={Style.errorCode}>Du skal vælge et Preset !</Text>
        )}
        <View style={Style.addPresetContainer}>
          <TouchableOpacity
            onPress={() => {
              code.setModalVisible(!code.modalVisible);
              code.setSelectedPreset(null);
            }}
            style={Style.addPresetButton}
          >
            <Text style={Style.addPresetText}>Add Preset</Text>
            <View style={Style.addPresetPlus}>
              <AntDesign name="plus" size={40} color="white" />
            </View>
          </TouchableOpacity>
        </View>
        <View style={Style.addPresetContainer}>
          <TextInput
            style={Style.input}
            onChangeText={code.onChangeText}
            value={code.textString}
            cursorColor={"black"}
            placeholder="Indsæt ## for at have navnet med."
            multiline={true}
            onFocus={() => {
              code.setisTyping(true);
            }}
            onBlur={() => {
              code.setisTyping(false);
            }}
          />
        </View>
        {code.errorText && (
          <Text style={Style.errorCode}>Du skal skrive en besked !</Text>
        )}
        <View style={Style.addPresetContainer}>
          <SlideToConfirm onConfirm={code.sendSms} />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default StartPage;
