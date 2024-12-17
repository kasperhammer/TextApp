import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
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

const StartPage = () => {
  const code = useStartCode();
  const styles = useStartStyle();
  const handleConfirm = () => {
    Alert.alert("Confirmed!", "You completed the slide.");
  };
  return (
    <TouchableWithoutFeedback onPress={code.dismissKeyboard}>
      <SafeAreaView style={styles.container}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={code.modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!code.modalVisible);
          }}
        >
            <AddPresetComp onClose={() => code.setModalVisible(false)}>

            </AddPresetComp>


        </Modal>
        
        <View style={styles.header}>
          <Text style={styles.headerText}>EasyText</Text>
        </View>

        <View style={styles.addPresetContainer}>
          <TouchableOpacity    onPress={() => code.setModalVisible(!code.modalVisible)} style={styles.addPresetButton}>
            <Text style={styles.addPresetText}>Add Preset</Text>
            <View style={styles.addPresetPlus}>
              <AntDesign name="plus" size={40} color="white" />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.addPresetContainer}>
          <TextInput
            style={styles.input}
            onChangeText={code.onChangeText}
            value={code.textString}
            placeholder="Indsæt ## for at have navnet med."
          />
        </View>
        <View style={styles.addPresetContainer}>
          <SlideToConfirm onConfirm={handleConfirm} />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default StartPage;
