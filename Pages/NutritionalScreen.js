import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const NutritionalScreen = () => {
  const navigation = useNavigation();

  const dishes = [
    {
      id: 1,
      image: require('../images/spagetti.png'),
      name: 'Spaghetti',
      nutritionalValues: [
        { name: 'Kalorie', value: '350 kcal' },
        { name: 'Białko', value: '15 g' },
        { name: 'Tłuszcze', value: '10 g' },
        { name: 'Węglowodany', value: '50 g' },
        { name: 'Błonnik', value: '5 g' },
      ],
    },
    {
      id: 2,
      image: require('../images/chicken.png'),
      name: 'Kurczak',
      nutritionalValues: [
        { name: 'Kalorie', value: '250 kcal' },
        { name: 'Białko', value: '30 g' },
        { name: 'Tłuszcze', value: '12 g' },
        { name: 'Węglowodany', value: '5 g' },
        { name: 'Błonnik', value: '2 g' },
      ],
    },
    {
      id: 3,
      image: require('../images/salad.png'),
      name: 'Sałatka',
      nutritionalValues: [
        { name: 'Kalorie', value: '120 kcal' },
        { name: 'Białko', value: '5 g' },
        { name: 'Tłuszcze', value: '3 g' },
        { name: 'Węglowodany', value: '20 g' },
        { name: 'Błonnik', value: '8 g' },
      ],
    },
    {
      id: 4,
      image: require('../images/fries.png'),
      name: 'Frytki',
      nutritionalValues: [
        { name: 'Kalorie', value: '300 kcal' },
        { name: 'Białko', value: '3 g' },
        { name: 'Tłuszcze', value: '15 g' },
        { name: 'Węglowodany', value: '40 g' },
        { name: 'Błonnik', value: '6 g' },
      ],
    },
    {
      id: 5,
      image: require('../images/steak.png'),
      name: 'Steak',
      nutritionalValues: [
        { name: 'Kalorie', value: '450 kcal' },
        { name: 'Białko', value: '25 g' },
        { name: 'Tłuszcze', value: '20 g' },
        { name: 'Węglowodany', value: '35 g' },
        { name: 'Błonnik', value: '4 g' },
      ],
    },
    {
      id: 6,
      image: require('../images/pizza_slice.png'),
      name: 'Pizza',
      nutritionalValues: [
        { name: 'Kalorie', value: '280 kcal' },
        { name: 'Białko', value: '12 g' },
        { name: 'Tłuszcze', value: '14 g' },
        { name: 'Węglowodany', value: '30 g' },
        { name: 'Błonnik', value: '3 g' },
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={dishes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.dishItem}>
            <Image source={item.image} style={styles.dishImage} />
            <Text style={styles.dishName}>{item.name}</Text>
            <Text style={styles.nutritionalTitle}>Wartości odżywcze:</Text>
            <FlatList
              data={item.nutritionalValues}
              keyExtractor={(value) => value.name}
              renderItem={({ item }) => (
                <View style={styles.nutritionalItem}>
                  <Text style={styles.nutritionalName}>{item.name}</Text>
                  <Text style={styles.nutritionalValue}>{item.value}</Text>
                </View>
              )}
            />
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>Powrót</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFFF1',
    padding: 20,
    marginTop: 20,
  },
  dishItem: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#FFC87C',
  },
  dishImage: {
    width: 150,
    height: 150,
    resizeMode: 'cover',
    alignSelf: 'center',
  },
  dishName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  nutritionalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  nutritionalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  nutritionalName: {
    fontSize: 16,
  },
  nutritionalValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#FF914C',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignSelf: 'center',
  },
  backButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default NutritionalScreen;
