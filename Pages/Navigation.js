import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Logowanie from "../Pages/Logowanie.js";
import HomeScreen from "../Pages/HomeScreen.js";
import MenuScreen from "../Pages/MenuScreen.js"; 
import Opinions from "../Pages/Opinions.js"; 
import MoreScreen from "../Pages/MoreScreen.js"; 
import NutritionalScreen from "../Pages/NutritionalScreen.js";
import Rejestracja from "../Pages/Rejestracja.js";
import MapScreen from './MapScreen.js';

const Stack = createNativeStackNavigator();

const optionScreen = {
  headerShown: false
};

const MainStack = () => {
  const [initialRouteName, setInitialRouteName] = useState(null);

  useEffect(() => {
    const authUser = async () => {
      try {
        let userData = await AsyncStorage.getItem('userData');
        if (userData) {
          userData = JSON.parse(userData);
          if (userData.loggedIn) {
            setInitialRouteName('HomeScreen');
          } else {
            setInitialRouteName('Logowanie');
          }
        } else {
          setInitialRouteName('Rejestracja');
        }
      } catch (error) {
        setInitialRouteName('Rejestracja');
      }
    };

    setTimeout(() => {
      authUser();
    }, 2000);
  }, []);

  return (
    <Stack.Navigator initialRouteName={initialRouteName}>
        <Stack.Screen name="Logowanie" component={Logowanie} options={optionScreen} />
        <Stack.Screen name="Home" component={HomeScreen} options={optionScreen} />
        <Stack.Screen name="MenuScreen" component={MenuScreen} options={optionScreen} />
        <Stack.Screen name="Opinions" component={Opinions} options={optionScreen} />
        <Stack.Screen name="MoreScreen" component={MoreScreen} options={optionScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={optionScreen} />
        <Stack.Screen name="NutritionalScreen" component={NutritionalScreen} options={optionScreen} />
        <Stack.Screen name="Rejestracja" component={Rejestracja} options={optionScreen} />
        <Stack.Screen name="MapScreen" component={MapScreen} options={optionScreen} />
    </Stack.Navigator>
  );
}

export default MainStack;
