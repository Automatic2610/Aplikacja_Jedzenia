import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const OrderScreen = () => {
  const restaurant = {
    backgroundColor: '#FBFFF1',
  };

  const products = [
    { id: 1, image: require('../images/spagetti.png'), name: 'Spaghetti', description: 'Pyszne spaghetti z sosem pomidorowym.', price: '25 zł', preparationTime: '30 min'},
    { id: 2, image: require('../images/chicken.png'), name: 'Kurczak', description: 'Soczysty kurczak smażony na patelni.', price: '20 zł', preparationTime: '40 min'},
    { id: 3, image: require('../images/salad.png'), name: 'Sałatka', description: 'Zdrowa sałatka z warzywami i sosem.', price: '12 zł', preparationTime: '10 min'},
    { id: 4, image: require('../images/fries.png'), name: 'Frytki', description: 'Chrupiące frytki podawane z sosem.', price: '10 zł', preparationTime: '10 min'},
    { id: 5, image: require('../images/steak.png'), name: 'Steak', description: 'Delikatny stek wołowy podawany z ziemniakami.', price: '30 zł', preparationTime: '40 min'},
    { id: 6, image: require('../images/pizza_slice.png'), name: 'Pizza', description: 'Kawałek pysznej pizzy z różnymi dodatkami.', price: '22 zł', preparationTime: '30 min'},
  ];

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const addToCart = (product) => {
    if (!selectedProducts.some((selectedProduct) => selectedProduct.id === product.id)) {
      setSelectedProducts([...selectedProducts, product]);
      setTotalPrice(totalPrice + parseFloat(product.price));
    }
  };

  const removeFromCart = (product) => {
    setSelectedProducts(selectedProducts.filter((selectedProduct) => selectedProduct.id !== product.id));
    setTotalPrice(totalPrice - parseFloat(product.price));
  };

  const toggleProductSelection = (product) => {
    if (selectedProducts.some((selectedProduct) => selectedProduct.id === product.id)) {
      removeFromCart(product);
    } else {
      addToCart(product);
    }
  };

  const navigation = useNavigation();

  const handleGoToBasket = () => {
    navigation.navigate('Koszyk', { selectedDishes: selectedProducts, restaurant });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.contentContainer, { backgroundColor: restaurant.backgroundColor }]}>
        <Text style={styles.selectProductsText}>Dodaj produkty do koszyka</Text>
        <Text style={styles.restaurantName}>{` ${restaurant.name}`}</Text>
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.productItem,
                selectedProducts.some((selectedProduct) => selectedProduct.id === item.id) && styles.selectedProduct,
              ]}
              onPress={() => toggleProductSelection(item)}
            >
              <Image source={item.image} style={styles.productImage} />
              <Text style={styles.productName}>{item.name}</Text>
              <Text>{item.description}</Text>
              <Text>{`Cena: ${item.price}`}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cartButton} onPress={handleGoToBasket}>
          <Text style={styles.cartButtonText}>{`Koszyk: ${totalPrice.toFixed(2)} zł`}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>Powrót</Text>
      </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
    backgroundColor: '#FBFFF1',
  },
  restaurantName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  selectProductsText: {
    fontSize: 22, 
    fontWeight: 'bold', 
    padding: 10, 
    backgroundColor: '#ff914c', 
    textAlign: 'center',
    borderRadius: 10, 
    marginTop: 20, 
  },
  productItem: {
    marginBottom: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedProduct: {
    backgroundColor: '#ff914c',
    borderColor: '#388E3C',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 10,
    paddingTop: 10,
    backgroundColor: '#FBFFF1',
  },
  cartButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  backButton: {
    backgroundColor: '#ff914c',
    padding: 15,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  backButtonText: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
  },
});

export default OrderScreen;