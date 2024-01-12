// Importy z React Native i bibliotek do obsługi map
import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

// Komponent Mapa przyjmuje parametr navigation z nawigacji (jeśli korzystasz z React Navigation)
const Mapa = ({ navigation }) => {
  // Dane restauracji z losowymi współrzędnymi
  const restaurants = [
    { name: 'Zupa z wczoraj', latitude: 50.868, longitude: 20.631 },
    { name: 'Kebab aż pali', latitude: 50.867, longitude: 20.628 },
    { name: 'Pizza u Siwego', latitude: 50.871, longitude: 20.633 },
    { name: 'Pierogi u Kryśki', latitude: 50.874, longitude: 20.629 },
    { name: 'Dobra buła', latitude: 50.869, longitude: 20.626 },
  ];

  // Obsługa przycisku powrotu
  const handleGoBack = () => {
    // Powrót do poprzedniego ekranu za pomocą nawigacji
    navigation.goBack();
  };

  return (
    // Komponent View, który zawiera MapView i przycisk powrotu
    <View style={styles.container}>
      {/* Komponent MapView do wyświetlania mapy */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 50.8709,
          longitude: 20.6295,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {/* Dodaj markery dla każdej restauracji */}
        {restaurants.map((restaurant, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: restaurant.latitude,
              longitude: restaurant.longitude,
            }}
            title={restaurant.name}
            description={`Sprawdź więcej informacji o ${restaurant.name}`}
          />
        ))}
      </MapView>
      {/* Przycisk powrotu, który wywołuje funkcję handleGoBack po naciśnięciu */}
      <Button title="Powrót" onPress={handleGoBack} />
    </View>
  );
};

// Style dla komponentu Mapa
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

// Eksport komponentu Mapa
export default Mapa;
