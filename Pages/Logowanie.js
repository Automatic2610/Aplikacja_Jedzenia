import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, Keyboard, Alert} from 'react-native';
import COLORS from '../Pages/Components/COLORS.js'
import Input from './Components/Input.js';
import Button from './Components/Button.js';
import Loader from './Components/Loader.js';
import axios from 'axios'
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

  const login = async () => {
    setLoading(true);
    setTimeout(async () => {
      setLoading(false);
    
        try {
      // Wysyłanie danych na serwer przy użyciu Axiosa
      const response = await axios.put('http://10.0.2.2:5725/login',inputs);
      // Jeśli serwer zwrócił odpowiedź pomyślną
      if (response.data.success) {
        setLoading(false);
        navigation.navigate('HomePage');
        await AsyncStorage.setItem('userData',JSON.stringify({...inputs, loggedIn: true}),);
      } 
      else {
        setLoading(false);
        Alert.alert('Błąd 1', JSON.stringify(response.data.error),[ { text: 'Zrozumiano'}]);
      }
    } catch (error) 
    {
      setLoading(false);
      Alert.alert('Błąd 2',error.message,[ { text: 'Zrozumiano'}]);
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
            label="Hasło"
            placeholder="Wpisz swoje hasło"
            error={errors.password}
            password
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
