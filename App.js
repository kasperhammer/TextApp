import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import ServiceCode from "./service/ServiceCode";
import StartPage from "./pages/StartPage/StartPage";

const Stack = createStackNavigator();

export default function App() {

  const serviceCode = ServiceCode();

useEffect(() => {
  console.log("TEST !!!!!!!!!!!!!!!!!!!!!");
  serviceCode.initDb();
}, [])

 
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Start" component={StartPage} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
