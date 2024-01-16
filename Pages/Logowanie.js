import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, Keyboard, Alert, Pressable} from 'react-native';
import COLORS from '../Pages/Components/COLORS.js'
import Input from './Components/Input.js';
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
      const response = await axios.put('http://192.168.1.33:5725/login',inputs);
      // Jeśli serwer zwrócił odpowiedź pomyślną
      if (response.data.success) {
        setLoading(false);
        navigation.navigate('HomeScreen');
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
    <SafeAreaView style={{backgroundColor: COLORS.ivory, flex: 1}}>
      <Loader visible={loading} />
      <View style={{paddingTop: 50, paddingHorizontal: 20}}>
        <Text style={{color: COLORS.orange,textAlign:'center' ,fontSize: 52, fontWeight: 'bold', fontStyle:'italic',   textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    }}>
          Zaloguj się
        </Text>
        <Text style={{color: COLORS.brown, textAlign:'center',fontSize: 18, marginVertical: 10}}>
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
            <Pressable style={{    color:COLORS.ivory,
    height:55,
    width: '100%',
    backgroundColor: COLORS.orange,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:15,
    marginVertical:20,
    borderColor:COLORS.brown,
    borderWidth:3,}
            } title="Zarejestruj się!" onPress={validate} >
            <Text style={{              color: COLORS.ivory,
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 24,}}>Zaloguj się !</Text>
            </Pressable>
          <Text
            onPress={() => navigation.navigate('Rejestracja')}
            style={{
              color: COLORS.brown,
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
