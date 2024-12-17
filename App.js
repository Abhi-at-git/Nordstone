import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import MainNavigation from "./navigation/MainNavigation";


const App = () => {
  
  return (
    <NavigationContainer>
      <MainNavigation />
    </NavigationContainer>
  );
}


export default App;
