import React, { useState } from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';

const MapScreen = () => {
  const navigation = useNavigation();

  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const restaurants = [
    { name: 'Restauracja "Testy"', latitude: 50.868, longitude: 20.631, description: 'Złóż zamówienie' },
    { name: 'Restauracja "Testy"', latitude: 50.867, longitude: 20.628, description: 'Złóż zamówienie' },
    { name: 'Restauracja "Testy"', latitude: 50.871, longitude: 20.633, description: 'Złóż zamówieniee' },
    { name: 'Restauracja "Testy"', latitude: 50.874, longitude: 20.629, description: 'Złóż zamówienie' },
    { name: 'Restauracja "Testy"', latitude: 50.869, longitude: 20.626, description: 'Złóż zamówienie' },
  ];

  const handleGoToMenu = (restaurant) => {
    navigation.navigate('OrderScreen', { restaurant });
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 50.8709,
          longitude: 20.6295,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {restaurants.map((restaurant, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: restaurant.latitude,
              longitude: restaurant.longitude,
            }}
          >
            <Callout onPress={() => handleGoToMenu(restaurant)}>
              <View>
                <Text>{restaurant.name}</Text>
                <Text>{restaurant.description}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default MapScreen;
