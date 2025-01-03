import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import StartPage from "./pages/StartPage/StartPage";
import ServiceCode from './service/ServiceCode'; // Import the ServiceCode instance

const Stack = createStackNavigator();
const serviceCode = ServiceCode(); // Create global ServiceCode instance
serviceCode.initDb();
global.serviceCode = serviceCode;

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Start" component={StartPage} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
