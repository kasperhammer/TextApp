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
import useStartStyle from "./StartStyle";
import AddPresetComp from "../../components/AddPresetComp/Comp";
import SlideToConfirm from "../../components/SlideToConfirm/SlideComp";
import { FlatList } from "react-native-gesture-handler";

const StartPage = () => {
  const code = useStartCode();

  const style = useStartStyle();
  const handleConfirm = () => {
    Alert.alert("Confirmed!", "You completed the slide.");
  };
  return (
    <TouchableWithoutFeedback onPress={code.dismissKeyboard}>
      <SafeAreaView style={style.container}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={code.modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!code.modalVisible);
          }}
        >
          <AddPresetComp onClose={code.AddPreset} preset={code.selectedPreset}></AddPresetComp>
        </Modal>

        <View style={style.header}>
          <Text style={style.headerText}>EasyText</Text>
        </View>

        <FlatList
          data={code.rows}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => code.handlePress(index)}
              onLongPress={() => code.handleLongPress(index)}
              style={[
                style.listItem,
                code.selectedIndex === index && style.selectedItem, // Conditional styling
              ]}
            >
              <Text style={style.listText}>{item.Name}</Text>
            </TouchableOpacity>
          )}
          style={style.listContainer}
        />

        <View style={style.spacing}></View>

        <View style={style.addPresetContainer}>
          <TouchableOpacity
            onPress={() => {code.setModalVisible(!code.modalVisible); code.setSelectedPreset(null);} }
            style={style.addPresetButton}
          >
            <Text style={style.addPresetText}>Add Preset</Text>
            <View style={style.addPresetPlus}>
              <AntDesign name="plus" size={40} color="white" />
            </View>
          </TouchableOpacity>
        </View>
        <View style={style.addPresetContainer}>
          <TextInput
            style={style.input}
            onChangeText={code.onChangeText}
            value={code.textString}
            placeholder="Indsæt ## for at have navnet med."
          />
        </View>
        <View style={style.addPresetContainer}>
          <SlideToConfirm onConfirm={handleConfirm} />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default StartPage;
