import React from 'react';
import { View, Text, SafeAreaView, Keyboard, ScrollView, Alert, StyleSheet, Pressable } from 'react-native';
import axios from 'axios'; // Import Axios library
import COLORS from '../Pages/Components/COLORS.js';
import Input from './Components/Input.js';
import Loader from './Components/Loader.js';

const Rejestracja = ({ navigation }) => {
  const [inputs, setInputs] = React.useState({
    email: '',
    fullname: '',
    phone: '',
    adres: '',
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
    if (!inputs.adres) {
      handleError('Prosze wprowadź swoj adres', 'adres');
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
      const response = await axios.post('http://192.168.1.33:5725/register', inputs);
      if (response.data.success) {
        setLoading(false);
        navigation.navigate('Logowanie');
      } else {
        setLoading(false);
        Alert.alert('Błąd', response.data.error, [{ text: 'Zrozumiano' }]);
      }
    } catch (error) {
      setLoading(false);
      Alert.alert('Błąd', error.message, [{ text: 'Zrozumiano' }]);
    }
  };

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };
  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Loader visible={loading} />
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <Text style={styles.headerText}>Rejestracja</Text>
        <Text style={styles.subHeaderText}>Wprowadź dane do rejestracji</Text>
        <View style={styles.formContainer}>
          <Input
            onChangeText={(text) => handleOnchange(text, 'email')}
            onFocus={() => handleError(null, 'email')}
            iconName="email-outline"
            label="Email"
            placeholder="Wprowadź swój adres E-mail"
            error={errors.email}
          />
          <Input
            onChangeText={(text) => handleOnchange(text, 'fullname')}
            onFocus={() => handleError(null, 'fullname')}
            iconName="account-outline"
            label="Imię i nazwisko"
            placeholder="Wprowadź swoje Imie i Nazwisko"
            error={errors.fullname}
          />
          <Input
            onChangeText={(text) => handleOnchange(text, 'adres')}
            onFocus={() => handleError(null, 'adres')}
            iconName="map-outline"
            label="Adres"
            placeholder="Wprowadź swoj adres"
            error={errors.adres}
          />
          <Input
            keyboardType="numeric"
            onChangeText={(text) => handleOnchange(text, 'phone')}
            onFocus={() => handleError(null, 'phone')}
            iconName="phone-outline"
            label="Numer telefonu"
            placeholder="Wprowadź numer telefonu"
            error={errors.phone}
          />
          <Input
            onChangeText={(text) => handleOnchange(text, 'password')}
            onFocus={() => handleError(null, 'password')}
            iconName="lock-outline"
            label="Hasło"
            placeholder="Wprowadź hasło"
            error={errors.password}
            password
          />
          <Pressable style={styles.button} onPress={validate}>
            <Text style={styles.buttonText}>Zarejestruj się !</Text>
          </Pressable>
          <Text onPress={() => navigation.navigate('Logowanie')} style={styles.loginText}>
            Masz już konto? Zaloguj się!
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: COLORS.ivory,
    flex: 1,
  },
  scrollViewContainer: {
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  headerText: {
    color: COLORS.orange,
    textAlign: 'center',
    fontSize: 52,
    fontWeight: 'bold',
    fontStyle: 'italic',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  subHeaderText: {
    color: COLORS.powderblue,
    textAlign: 'center',
    fontSize: 18,
    marginVertical: 10,
  },
  formContainer: {
    marginVertical: 20,
  },
  button: {
    color: COLORS.ivory,
    height: 55,
    width: '100%',
    backgroundColor: COLORS.orange,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginVertical: 20,
    borderColor: COLORS.brown,
    borderWidth: 3,
  },
  buttonText: {
    color: COLORS.ivory,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 24,
  },
  loginText: {
    color: COLORS.brown,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default Rejestracja;
