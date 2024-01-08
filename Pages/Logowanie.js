import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, Keyboard } from 'react-native';
import COLORS from '../Pages/Components/COLORS.js'
import Input from './Components/Input.js';
import Button from './Components/Button.js';
import Loader from './Components/Loader.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Logowanie = ({ navigation }) => {

  const [inputs, setInputs] = React.useState({email: '', password: ''});
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const validate = async () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!inputs.email) {
      handleError('Proszę wprowadź E-mail', 'email');
      isValid = false;
    }
    if (!inputs.password) {
      handleError('Proszę wprowadź hasło', 'password');
      isValid = false;
    }
    if (isValid) {
      login();
    }
  };

  const login = () => {
    setLoading(true);
    setTimeout(async () => {
      setLoading(false);
      let userData = await AsyncStorage.getItem('userData');
      if (userData) {
        userData = JSON.parse(userData);
        if (
          inputs.email == userData.email &&
          inputs.password == userData.password
        ) {
          navigation.navigate('Home_Page');
          AsyncStorage.setItem(
            'userData',
            JSON.stringify({...userData, loggedIn: true}),
          );
        } else {
          Alert.alert('Error', 'Błędne dane');
        }
      } else {
        Alert.alert('Error', 'Użytkonik nie istnieje');
      }
    }, 3000);
  };

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };
  return (
    <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
      <Loader visible={loading} />
      <View style={{paddingTop: 50, paddingHorizontal: 20}}>
        <Text style={{color: COLORS.black, fontSize: 40, fontWeight: 'bold'}}>
          Zaloguj się
        </Text>
        <Text style={{color: COLORS.grey, fontSize: 18, marginVertical: 10}}>
          Wpisz dane do zalogowania
        </Text>
        <View style={{marginVertical: 20}}>
          <Input
            onChangeText={text => handleOnchange(text, 'email')}
            onFocus={() => handleError(null, 'email')}
            iconName="email-outline"
            label="Email"
            placeholder="Wpisz swój email"
            error={errors.email}
          />
          <Input
            onChangeText={text => handleOnchange(text, 'password')}
            onFocus={() => handleError(null, 'password')}
            iconName="lock-outline"
            label="password"
            placeholder="Wpisz swoje hasło"
            error={errors.rejestracja}
            rejestracja
          />
          <Button title="Zaloguj się" onPress={validate} />
          <Text
            onPress={() => navigation.navigate('Rejestracja')}
            style={{
              color: COLORS.black,
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 16
            }}>
            Nie masz konta? Zarejestruj się!
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};


export default Logowanie;
