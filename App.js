import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import HomePage from "./pages/HomePage/HomePage";
import NotePage from "./pages/NotePage/NotePage";
import StartPage from "./pages/StartPage/StartPage";

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator screenOptions={{headerShown: false}}> 
    <Stack.Screen name="Start" component={StartPage} />
    <Stack.Screen name="Home" component={HomePage} />
    <Stack.Screen name="NotePage" component={NotePage} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
