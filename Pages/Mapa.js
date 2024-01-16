// Mapa.js
import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const Mapa = ({ navigation }) => {
  const restaurants = [
    { id: 1, name: 'Duży chicken', latitude: 50.868, longitude: 20.631 },
    { id: 2, name: 'Spaghetti kręcone', latitude: 50.867, longitude: 20.628 },
    { id: 3, name: 'Pizza u Siwego', latitude: 50.871, longitude: 20.633 },
    { id: 4, name: 'Dobra fryta', latitude: 50.874, longitude: 20.629 },
    { id: 5, name: 'Vege knajpa', latitude: 50.869, longitude: 20.626 },
  ];

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleRestaurantPress = (restaurant) => {
    // Przejście do ekranu MenuOgolne i przekazanie informacji o restauracji
    navigation.navigate('MenuOgolne', { restaurant });
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
        {restaurants.map((restaurant) => (
          <Marker
            key={restaurant.id}
            coordinate={{
              latitude: restaurant.latitude,
              longitude: restaurant.longitude,
            }}
            title={restaurant.name}
            description={`Sprawdź więcej informacji o ${restaurant.name}`}
            onPress={() => handleRestaurantPress(restaurant)}
          />
        ))}
      </MapView>
      <Button title="Powrót" onPress={handleGoBack} />
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

export default Mapa;
