import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PotwierdzenieZamowienia = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>Dziękujemy za zamówienie!</Text>
      <Text style={styles.message}>Smacznego!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default PotwierdzenieZamowienia;
