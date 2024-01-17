import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Keyboard, Platform, ScrollView,} from 'react-native';
import COLORS from './Components/COLORS';
import Task from '../Pages/Components/Task';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

export default function Opinions() {
  const navigation = useNavigation();

  const [task, setTask] = useState('');
  const [open, setOpen] = useState(false);
  const [opinieRestauracji, setOpinieRestauracji] = useState({});
  const [value, setValue] = useState(null);
  const restauracje = [
    { label: 'Tasty - PŚK', value: 'Tasty - PŚK' },
    { label: 'Tasty - Dworzec PKP', value: 'Tasty - Dworzec PKP' },
    { label: 'Tasty - Suzuki Arena', value: 'Tasty - Suzuki Arena' },
    { label: 'Tasty - Galeria Korona', value: 'Tasty - Galeria Korona' },
  ];
  const [items, setItems] = useState(restauracje);

  const ustawNoweZadanie = async () => {
    Keyboard.dismiss();

    try {
      const response = await axios.post('http://192.168.1.33:5725/opinie/dodaj', {
        restauracja: value,
        opinia: task,
      });

      if (response.data.success) {
        const aktualneOpinie = opinieRestauracji[value] || [];
        const noweOpinie = [...aktualneOpinie, task];

        setOpinieRestauracji({
          ...opinieRestauracji,
          [value]: noweOpinie,
        });

        setTask('');
      } else {
        console.error('Błąd podczas wysyłania danych:', response.data.error);

      }
    } catch (error) {
      console.error('Błąd podczas wysyłania danych:', error);
    }
  };

  useEffect(() => {
    const requests = restauracje.map((restauracja) => axios.get(`http://192.168.1.33:5725/opinie/${restauracja.value}`));

    Promise.all(requests)
      .then((responses) => {
        const updatedOpinieRestauracji = {};
        responses.forEach((response, index) => {
          if (response.data.opinie.length > 0) {
            const restauracja = restauracje[index].value;
            updatedOpinieRestauracji[restauracja] = response.data.opinie;
          }
        });
        setOpinieRestauracji(updatedOpinieRestauracji);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

   return (
    <View style={styles.container}>
      <Text style={styles.naglowek}>Opinie naszych restauracji</Text>
      <ScrollView
        style={styles.opinie}
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="handled">
        {Object.entries(opinieRestauracji).map(([restauracja, opinie]) => (
          <View key={restauracja}>
            <Text style={styles.naglowekRestauracji}>{restauracja}</Text>
            {opinie.map((opinia, opiniaIndex) => (
              <Task key={opiniaIndex} text={opinia} />
            ))}
          </View>
        ))}
      </ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.pisanie}>
        <DropDownPicker
          style={styles.wybierz}
          placeholder={'Wybierz restaurację'}
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          theme="LIGHT"
          multiple={false}
          mode="BADGE"
          badgeDotColors={[
            '#e76f51',
            '#00b4d8',
            '#e9c46a',
            '#e76f51',
            '#8ac926',
            '#00b4d8',
            '#e9c46a',
          ]}
        />
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder={'Wpisz opinię'}
            value={task}
            onChangeText={(text) => setTask(text)}
          />
          <TouchableOpacity onPress={() => ustawNoweZadanie()}>
            <View style={styles.dodajZadanie}>
              <Text>+</Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Powrót </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: COLORS.ivory,
  },
  naglowek: {
    marginTop: 70,
    paddingHorizontal: 30,
    fontWeight: 'bold',
    fontSize: 28,
    color: COLORS.brown,
    alignItems: 'center',
  },
  opinie: {
    marginTop: 20,
    paddingHorizontal: 20,
    flex: 1,
  },
  pisanie: {
    display: 'flex',
    flexDirection: 'column',
    padding: 20,
    gap: 15,
  },
  input: {
    paddingHorizontal: 25,
    flex: 1,
    backgroundColor: COLORS.orange,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: COLORS.brown,
  },
  dodajZadanie: {
    width: 60,
    height: 60,
    backgroundColor: COLORS.orange,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: COLORS.brown,
  },
  wybierz: {
    paddingHorizontal: 25,
    backgroundColor: COLORS.orange,
    borderWidth: 3,
    borderColor: COLORS.brown,
  },
  naglowekRestauracji: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: COLORS.brown,
  },
  backButton: {
    backgroundColor: '#FF914C',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignSelf: 'center',
  },
  backButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  inputRow: {
    flexDirection: 'row',
    gap: 20,
  },
});
