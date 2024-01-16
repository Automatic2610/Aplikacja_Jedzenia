import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const OrderConfirmation = ({ navigation, route }) => {
  const { deliveryTime } = route.params;
  const [estimatedDeliveryTime, setEstimatedDeliveryTime] = useState(null);

  useEffect(() => {
    if (deliveryTime) {
      const [hoursStr, minutesStr] = deliveryTime.split(' godz. ');
      const hours = parseInt(hoursStr, 10);
      const minutes = parseInt(minutesStr.replace(' min.', ''), 10);
      if (!isNaN(hours) && !isNaN(minutes)) {
        const currentTime = new Date();
        currentTime.setHours(currentTime.getHours() + hours);
        currentTime.setMinutes(currentTime.getMinutes() + minutes + 15);
        setEstimatedDeliveryTime(currentTime);
      }
    }
  }, [deliveryTime]);

  const formatTime = (time) => {
    if (time) {
      const hours = time.getHours().toString().padStart(2, '0');
      const minutes = time.getMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    }
    return '';
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.message}>Dziękujemy za zamówienie!</Text>
      {estimatedDeliveryTime && (
        <Text style={styles.message}>
          Twoje zamówienie dotrze około godziny{' '}
          <Text style={styles.orangeText}>{formatTime(estimatedDeliveryTime)}</Text>.
        </Text>
      )}
      <Text style={styles.message}>Smacznego!</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('HomeScreen')}>
        <Text style={styles.buttonText}>Wróć do strony głównej</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FBFFF1',
  },
  message: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  orangeText: {
    color: '#ff914c',
  },
  button: {
    backgroundColor: '#ff914c',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default OrderConfirmation;
