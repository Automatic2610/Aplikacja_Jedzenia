// Koszyk.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Koszyk = ({ route }) => {
  const { selectedDishes, restaurant } = route.params;

  // Funkcja do obliczania łącznej ceny
  const calculateTotalPrice = () => {
    return selectedDishes.reduce((total, dishId) => {
      const selectedDish = restaurant.menu.find((dish) => dish.id === dishId);
      return total + parseInt(selectedDish.price);
    }, 0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Twój koszyk:</Text>
      <Text style={styles.restaurantName}>{restaurant.name}</Text>
      <View style={styles.dishContainer}>
        {selectedDishes.map((dishId) => {
          const selectedDish = restaurant.menu.find((dish) => dish.id === dishId);
          return (
            <View key={dishId} style={styles.selectedDish}>
              <Text>{selectedDish.name}</Text>
              <Text>{`Cena: ${selectedDish.price}`}</Text>
              <Text>{`Czas przygotowania: ${selectedDish.preparationTime}`}</Text>
            </View>
          );
        })}
      </View>
      <Text style={styles.totalText}>{`Łączna cena: ${calculateTotalPrice()} zł`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dishContainer: {
    width: '80%',
    marginBottom: 20,
  },
  selectedDish: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 5,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
});

export default Koszyk;
