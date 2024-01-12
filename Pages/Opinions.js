import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  ScrollView,
} from 'react-native';
import Task from '../Pages/Components/Task';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';

export default function Opinions({ navigation }) {
  const [task, setTask] = useState('');
  const [open, setOpen] = useState(false);
  const [opinieRestauracji, setOpinieRestauracji] = useState({});
  const [value, setValue] = useState(null);
  const restauracje = [
    { label: 'Tasty - PŚK', value: 'Tasty - PŚK' },
    { label: 'Tasty - Dworzec PKP', value: 'Tasty - Dworzec PKP' },
    { label: 'Tasty - Suzuki Arena', value: 'Tasty - Suzuki Arena' },
    { label: 'Tasty - Galeria Korona', value: 'Tasty - Galeria Korona' },
  ]
  const [items, setItems] = useState(restauracje);

  const ustawNoweZadanie = async () => {
    Keyboard.dismiss();

    try {
      const response = await axios.post('http://10.0.2.2:5725/opinie/dodaj', {
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
        // Obsługa błędu
      }
    } catch (error) {
      console.error('Błąd podczas wysyłania danych:', error);
      // Obsługa błędu
    }
  };

  useEffect(() => {
    for (const restauracja of restauracje) {
      axios.get(`http://10.0.2.2:5725/opinie/${restauracja.value}`)
        .then((response) => {
          if(response.data.opinie.length > 0)
          {
            setOpinieRestauracji({
              ...opinieRestauracji,
              [restauracja.value]: response.data.opinie,
            });
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [value]);

  return (
    <View style={styles.container}>
      <Text style={styles.naglowek}>Opinie naszych restauracji</Text>
      <ScrollView
        style={styles.opinie}
        contentContainerStyle={{ flexGrow: 1 }}
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
            ]}/>
        <View style={{ flexDirection: 'row', gap: 20 }}>
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
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#ABCDEF',
  },
  naglowek: {
    marginTop: 70,
    paddingHorizontal: 30,
    fontWeight: 'bold',
    fontSize: 24,
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
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  input: {
    paddingHorizontal: 25,
    flex: 1,
    backgroundColor: '#ffffff',
    borderColor: '#C0C0C0',
    borderRadius: 60,
    borderWidth: 1,
  },
  dodajZadanie: {
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  wybierz: {
    paddingHorizontal: 25,
  },
  naglowekRestauracji: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
});
