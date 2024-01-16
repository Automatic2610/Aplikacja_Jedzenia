import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Koszyk = ({ route, navigation }) => {
  const { selectedDishes, restaurant } = route.params;

  const calculateTotalPrice = () => {
    return selectedDishes.reduce((total, dish) => {
      return total + (dish.price ? parseFloat(dish.price) : 0);
    }, 0).toFixed(2);
  };

  const calculateTotalPreparationTime = () => {
    return selectedDishes.reduce((total, dish) => {
      return total + (dish.preparationTime ? parseFloat(dish.preparationTime) : 0);
    }, 0);
  };

  const formatPreparationTime = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours} godz. ${minutes} min.`;
  };

  const handleOrder = () => {

    navigation.navigate('PotwierdzenieZamowienia');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Twój koszyk:</Text>
      <Text style={styles.restaurantName}>{restaurant.name}</Text>
      <View style={styles.dishContainer}>
        {selectedDishes.map((selectedDish) => (
          <View key={selectedDish.id} style={styles.selectedDish}>
            <Text>{selectedDish.name}</Text>
            <Text>{`Cena: ${selectedDish.price}`}</Text>
            <Text>{`Czas przygotowania: ${selectedDish.preparationTime} min.`}</Text>
          </View>
        ))}
      </View>
      <Text style={styles.totalText}>{`Cena: ${calculateTotalPrice()} zł`}</Text>
      <Text style={styles.totalText}>{`Czas oczekiwania: ${formatPreparationTime(
        calculateTotalPreparationTime()
      )}`}</Text>
      <TouchableOpacity style={styles.orderButton} onPress={handleOrder}>
        <Text style={styles.orderButtonText}>Zamów</Text>
      </TouchableOpacity>
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
    marginTop: 10,
  },
  orderButton: {
    backgroundColor: '#00B9AE',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  orderButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Koszyk;
