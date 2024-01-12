import { setStatusBarBackgroundColor } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {View,Text,StyleSheet, TouchableOpacity} from 'react-native'

const Task = (props) => {
  

  return (
    <View style={styles.Zadania}>
      <View style={styles.ZadaniaDod}>
        <Text style={styles.TekstZadania}>
          {props.text}
        </Text>
      </View>
      <View style={styles.Guzik}></View>
    </View>
  );
};


const styles = StyleSheet.create({
    Zadania:{
       backgroundColor: '#ffffff',
       padding: 15,
       borderRadius: 10,
       justifyContent:'space-between',
        marginBottom:20,
        alignItems:'center',
        flexDirection:'row',
        
    },
    ZadaniaDod: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    Zaznaczanie: {
        width: 24,
        height: 24,
        borderRadius:5,
        marginRight:15,
    },
    TekstZadania: {
        maxWidth:'80%',
    },
    Guzik: {
        width: 12,
        height: 12,
        borderColor:'#ABCDEF',
        borderWidth:2,
        borderRadius:5,
        marginRight:10,
    },

});
export default Task;