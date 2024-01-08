import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logowanie from "../Pages/Logowanie.js";
import Home from "../Pages/Home.js";
import Rejestracja from "../Pages/Rejestracja.js";

const Stack = createNativeStackNavigator();

const optionScreen = {
  headerShown: false
};

export default function StackNav() {
  return (
        <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={optionScreen} />
        <Stack.Screen name="Logowanie" component={Logowanie} options={optionScreen} />
        <Stack.Screen name="Rejestracja" component={Rejestracja} options={optionScreen} />        
        </Stack.Navigator>
  );
}
