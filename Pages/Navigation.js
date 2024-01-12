import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Logowanie from "../Pages/Logowanie.js";
import Home from "../Pages/Home.js";
import Rejestracja from "../Pages/Rejestracja.js";
import HomePage from "../Pages/Home_Page.js";
import Opinions from './Opinions.js';

const Stack = createNativeStackNavigator();

const optionScreen = {
  headerShown: false
};

export default function StackNav() {
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
    <Stack.Navigator>
        <Stack.Screen name="Opinions" component={Opinions} options={optionScreen} />
        <Stack.Screen name="Home" component={Home} options={optionScreen} />
        <Stack.Screen name="Logowanie" component={Logowanie} options={optionScreen} />
        <Stack.Screen name="Rejestracja" component={Rejestracja} options={optionScreen} />
        {/* <Stack.Screen name="Opinions" component={Opinions} options={optionScreen} /> */}
        <Stack.Screen name="HomePage" component={HomePage} options={optionScreen} />
    </Stack.Navigator>
  );
}
