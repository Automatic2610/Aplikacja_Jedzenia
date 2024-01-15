import React from 'react';
import axios, { Axios } from 'axios';
import {
  View,
  Text,
  SafeAreaView,
  Keyboard,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  StyleSheet,
  Pressable,
} from 'react-native';
import COLORS from '../Pages/Components/COLORS.js'
import Input from './Components/Input.js';
import Button from './Components/Button.js';
import Loader from './Components/Loader.js';

const Rejestracja = ({navigation}) => {
  const [inputs, setInputs] = React.useState({
    email: '',
    fullname: '',
    phone: '',
    password: '',
  });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.email) {
      handleError('Prosze wprowadź E-mail', 'email');
      isValid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError('Prosze wprowadź poprawny E-mail', 'email');
      isValid = false;
    }

    if (!inputs.fullname) {
      handleError('Prosze wprowadź swoje Imię', 'fullname');
      isValid = false;
    }

    if (!inputs.phone) {
      handleError('Prosze wprowadź numer telefonu', 'phone');
      isValid = false;
    }

    if (!inputs.password) {
      handleError('Prosze wprowadź hasło', 'password');
      isValid = false;
    } else if (inputs.password.length < 5) {
      handleError('Hasło musi mieć min. 5 znaków', 'password');
      isValid = false;
    }

    if (isValid) {
      rejestracja();
    }
  };

  const rejestracja = async () => {
    setLoading(true);
    try {
      // Wysyłanie danych na serwer przy użyciu Axiosa
      const response = await axios.post('http://10.0.2.2:5725/register',inputs);
      // Jeśli serwer zwrócił odpowiedź pomyślną
      if (response.data.success) {
        setLoading(false);
        navigation.navigate('Logowanie');
      } 
      else {
        setLoading(false);
        Alert.alert('Błąd 1', JSON.stringify(response.data.error),[ { text: 'Zrozumiano'}]
        );
      }
    } catch (error) {
      setLoading(false);
      Alert.alert(error);
    }
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
      <ScrollView
        contentContainerStyle={{paddingTop: 50, paddingHorizontal: 20}}>
        <Text style={{color: COLORS.orange,textAlign:'center' ,fontSize: 52, fontWeight: 'bold', fontStyle:'italic',   textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,}}>
          Rejestracja
        </Text>
        <Text style={{color: COLORS.powderblue, textAlign:'center',fontSize: 18, marginVertical: 10}}>
          Wprowadź dane do rejestracji
        </Text>
        <View style={{marginVertical: 20}}>
          <Input
            onChangeText={text => handleOnchange(text, 'email')}
            onFocus={() => handleError(null, 'email')}
            iconName="email-outline"
            label="Email"
            placeholder="Wprowadź swój adres E-mail"
            error={errors.email}
          />

          <Input
            onChangeText={text => handleOnchange(text, 'fullname')}
            onFocus={() => handleError(null, 'fullname')}
            iconName="account-outline"
            label="Imię i nazwisko"
            placeholder="Wprowadź swoje Imie i Nazwisko"
            error={errors.fullname}
          />

          <Input
            keyboardType="numeric"
            onChangeText={text => handleOnchange(text, 'phone')}
            onFocus={() => handleError(null, 'phone')}
            iconName="phone-outline"
            label="Numer telefonu"
            placeholder="Wprowadź numer telefonu"
            error={errors.phone}
          />
          <Input
            onChangeText={text => handleOnchange(text, 'password')}
            onFocus={() => handleError(null, 'password')}
            iconName="lock-outline"
            label="Hasło"
            placeholder="Wprowadź hasło"
            error={errors.password}
            password
          />
          <Pressable style={styles.przycisk} title="Zarejestruj się!" onPress={validate} >
            <Text style={{              color: COLORS.ivory,
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 24,}}>Zarejestruj się !</Text>
            </Pressable>
          <Text
            onPress={() => navigation.navigate('Logowanie')}
            style={{
              color: COLORS.brown,
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 16,
            }}>
            Masz już konto? Zaloguj się!
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  przycisk:{
    color:COLORS.ivory,
    height:55,
    width: '100%',
    backgroundColor: COLORS.orange,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:15,
    marginVertical:20,
    borderColor:COLORS.brown,
    borderWidth:3,
  },
});
export default Rejestracja;