import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import COLORS from './COLORS';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Task = (props) => {
  const [kolor, setKolor] = useState('white');
  const [kolor1, setKolor1] = useState('white');


  const ChangeColor = () => {
    if (kolor === 'white') {
      setKolor('blue');
      setKolor1('white');
    } else {
      setKolor('white');
    }
  };

  const ChangeColor1 = () => {
    if (kolor1 === 'white') {
      setKolor1('red');
      setKolor('white');
    } else {
      setKolor1('white');
    }
  };

  return (
    <View style={styles.Zadania}>
      <View style={styles.ZadaniaDod}>
        <Text style={styles.TekstZadania}>{props.text}</Text>
      </View>
      <View style={styles.Guzik}>
      <TouchableOpacity
      style={{marginHorizontal:20}}
        onPress={() => ChangeColor()}
      >
        <MaterialCommunityIcons
          name="thumb-up"
          size={36}
          color={kolor}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => ChangeColor1()}>
        <MaterialCommunityIcons
          name="thumb-down"
          size={36}
          color={kolor1}
        />
      </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Guzik:{
    flexDirection:'row',
  },
  Zadania: {
    backgroundColor: COLORS.orange,
    padding: 15,
    borderRadius: 10,
    justifyContent: 'space-between',
    marginBottom: 20,
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 3,
    borderColor: COLORS.brown,
  },
  ZadaniaDod: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  Zaznaczanie: {
    width: 24,
    height: 24,
    borderRadius: 5,
    marginRight: 15,
  },
  TekstZadania: {
    maxWidth: '80%',
    fontWeight:'bold',
    fontSize:18,
    color:COLORS.ivory,
  },
});

export default Task;
