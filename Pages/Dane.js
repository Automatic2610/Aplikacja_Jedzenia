import React from 'react';
import { View, Text } from 'react-native';

const Dane = ({ route }) => {
  const { restaurant } = route.params;

  return (
    <View>
      <Text>Informacje o Restauracji</Text>
      <Text>Nazwa: {restaurant.name}</Text>
      <Text>Latitude: {restaurant.latitude}</Text>
      <Text>Longitude: {restaurant.longitude}</Text>
      
      {/* Wyświetl przykładowe menu dania */}
      <Text>Menu dania:</Text>
      {restaurant.menu.map((dish, index) => (
        <Text key={index}>{dish}</Text>
      ))}
    </View>
  );
};

export default Dane;
