// CouponsScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CouponsScreen = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Coupons Screen</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default CouponsScreen;
