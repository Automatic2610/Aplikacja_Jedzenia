import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const MoreScreen = () => {
  const navigation = useNavigation();


  const handleLogout = async() => {
    await AsyncStorage.removeItem('userData');
    navigation.navigate('Logowanie');
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../images/logo.png')}
          style={styles.logo}
        />
      </View>
      <View style={styles.linksContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('MenuScreen')}>
          <View style={styles.linkItem}>
            <Image
              source={require('../images/menu1-icon.png')}
              style={styles.linkIcon}
            />
            <Text style={styles.linkText}>Menu</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('NutritionalScreen')}>
          <View style={styles.linkItem}>
            <Image
              source={require('../images/nutritional-icon.png')}
              style={styles.linkIcon}
            />
            <Text style={styles.linkText}>Tabela Wartości Odżywczych</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Opinions')}>
          <View style={styles.linkItem}>
            <Image
              source={require('../images/opinions-icon.png')}
              style={styles.linkIcon}
            />
            <Text style={styles.linkText}>Opinie</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout}>
          <View style={styles.linkItem}>
            <Image
              source={require('../images/logout-icon.png')}
              style={styles.linkIcon}
            />
            <Text style={styles.linkText}>Wyloguj</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFFF1',
    padding: 20,
    marginTop: 15,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  logo: {
    width: 300,
    height: 200,
  },
  linksContainer: {
    padding: 20,
  },
  linkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20, 
    paddingVertical: 20, 
    paddingHorizontal: 20, 
    borderRadius: 10, 
    backgroundColor: '#ff914c', 
  },
  linkIcon: {
    width: 40, 
    height: 40, 
    marginRight: 20, 
  },
  linkText: {
    fontSize: 24, 
    fontWeight: 'bold',
    color: 'black',
  },
});

export default MoreScreen;
