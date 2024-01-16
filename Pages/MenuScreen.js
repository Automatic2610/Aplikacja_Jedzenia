import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MenuScreen = () => {
  const navigation = useNavigation();

  const dishes = [
    { id: 1, image: require('../images/spagetti.png'), name: 'Spaghetti', description: 'Pyszne spaghetti z sosem pomidorowym.' },
    { id: 2, image: require('../images/chicken.png'), name: 'Kurczak', description: 'Soczysty kurczak smażony na patelni.' },
    { id: 3, image: require('../images/salad.png'), name: 'Sałatka', description: 'Zdrowa sałatka z warzywami i sosem.' },
    { id: 4, image: require('../images/fries.png'), name: 'Frytki', description: 'Chrupiące frytki podawane z sosem.' },
    { id: 5, image: require('../images/steak.png'), name: 'Steak', description: 'Delikatny stek wołowy podawany z ziemniakami.' },
    { id: 6, image: require('../images/pizza_slice.png'), name: 'Pizza', description: 'Kawałek pysznej pizzy z różnymi dodatkami.' },

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
            <Text style={styles.dishDescription}>{item.description}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')} style={styles.backButton}>
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
    backgroundColor: '#ff914c',
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
  dishDescription: {
    fontSize: 16,
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: '#ff914c',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignSelf: 'center',
  },
  backButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default MenuScreen;
