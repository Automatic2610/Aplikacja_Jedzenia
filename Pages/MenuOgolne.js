// MenuOgolne.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const handleGoToBasket = () => {
    navigation.navigate('Koszyk', { selectedDishes, restaurant });
  };

const MenuOgolne = ({ route }) => {
  const { restaurant } = route.params;

  // Mapa z przypisanymi daniami, kolorami tła i ścieżkami do obrazów dla każdej restauracji
  const restaurantData = {
    'Duży chicken': {
      menu: [
        { id: 1, name: 'Kurczak BBQ', price: '20 zł', preparationTime: '25 min' },
        { id: 2, name: 'Hot Wings', price: '15 zł', preparationTime: '20 min' },
        { id: 3, name: 'Zestaw obiadowy', price: '30 zł', preparationTime: '30 min' },
      ],
      backgroundColor: '#FF914C',
      image: require('../../Projekt_App_Jedzenie/images/chicken.png'),
    },
    'Spaghetti kręcone': {
      menu: [
        { id: 1, name: 'Spaghetti zielone', price: '25 zł', preparationTime: '30 min' },
        { id: 3, name: 'Makaron po Włosku', price: '18 zł', preparationTime: '25 min' },
        { id: 3, name: 'Makaron mieszany', price: '35 zł', preparationTime: '15 min' },
      ],
      backgroundColor: '#124E78',
      image: require('../../Projekt_App_Jedzenie/images/spagetti.png'),
    },
    'Pizza u Siwego': {
      menu: [
        { id: 1, name: 'Margherita', price: '20 zł', preparationTime: '25 min' },
        { id: 2, name: 'Capricciosa', price: '25 zł', preparationTime: '30 min' },
        { id: 3, name: 'Vegetariana', price: '22 zł', preparationTime: '28 min' },
      ],
      backgroundColor: '#124E78',
      image: require('../../Projekt_App_Jedzenie/images/pizza_slice.png'),
    },
    'Dobra fryta': {
      menu: [
        { id: 1, name: 'Klasyczne frytki', price: '10 zł', preparationTime: '15 min' },
        { id: 2, name: 'Ziemniaki według Dobrej Receptury', price: '15 zł', preparationTime: '20 min' },
        { id: 3, name: 'Frytki z dyni', price: '12 zł', preparationTime: '18 min' },
      ],
      backgroundColor: '#00B9AE',
      image: require('../../Projekt_App_Jedzenie/images/fries.png'),
    },
    'Vege knajpa': {
      menu: [
        { id: 1, name: 'Burger wegański', price: '18 zł', preparationTime: '20 min' },
        { id: 2, name: 'Falafel w picie', price: '15 zł', preparationTime: '18 min' },
        { id: 3, name: 'Sałatka warzywna', price: '12 zł', preparationTime: '15 min' },
      ],
      backgroundColor: '#823329',
      image: require('../../Projekt_App_Jedzenie/images/salad.png'),
    },
  };

  const { menu, backgroundColor, image } = restaurantData[restaurant.name] || {
    menu: [],
    backgroundColor: '#FFFFFF',
    image: null,
  }; // Domyślne puste menu, białe tło i brak obrazu

  const [selectedDishes, setSelectedDishes] = useState([]);

  const toggleDishSelection = (dishId) => {
    const isDishSelected = selectedDishes.includes(dishId);
    if (isDishSelected) {
      setSelectedDishes(selectedDishes.filter((id) => id !== dishId));
    } else {
      setSelectedDishes([...selectedDishes, dishId]);
    }
  };

   return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={styles.restaurantName}>{`Menu: ${restaurant.name}`}</Text>
      {image && <Image source={image} style={styles.restaurantImage} />}
      <View style={styles.menuContainer}>
        {menu.map((dish) => (
          <TouchableOpacity
            key={dish.id}
            style={[
              styles.dishContainer,
              selectedDishes.includes(dish.id) && styles.selectedDish,
            ]}
            onPress={() => toggleDishSelection(dish.id)}
          >
            <Text style={styles.dishName}>{dish.name}</Text>
            <Text>{`Cena: ${dish.price}`}</Text>
            <Text>{`Czas przygotowania: ${dish.preparationTime}`}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.bottomTextContainer}>
  <TouchableOpacity style={styles.bottomText} onPress={handleGoToBasket}>
    <Text>Przejdź do koszyka</Text>
  </TouchableOpacity>
</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  restaurantName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30,
    color: 'white',
  },
  restaurantImage: {
    width: '60%',
    height: 200, // Dostosuj wysokość obrazu pod napisem
    resizeMode: 'cover',
    marginBottom: 10,
  },
  menuContainer: {
    width: '40%',
  },
  dishContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 5,
  },
  selectedDish: {
    borderColor: 'green',
    borderWidth: 2,
  },
  dishName: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'white',
  },
  bottomTextContainer: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
  },
  bottomText: {
    fontSize: 16,
    color: 'white',
  },
});

export default MenuOgolne;
