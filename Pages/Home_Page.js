import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet, View, Text } from 'react-native';
import MapScreen from '../Pages/MapScreen.js';
import CouponsScreen from '../Pages/CouponsScreen.js';
import MoreScreen from '../Pages/More_Screen.js';
import Opinions from './Opinions.js';

const Tab = createBottomTabNavigator();

const HomeScreen = ({ navigation }) => {
  return (
    <Tab.Navigator
      initialRouteName="MainPage"
      screenOptions={{
        tabBarActiveTintColor: "#FF914C",
        tabBarInactiveTintColor: "gray",
        tabBarLabelStyle: {
          fontSize: 16,
          fontWeight: "bold"
        },
        tabBarStyle: [
          {
            display: "flex",
            backgroundColor: '#FBFFF1',
            borderTopColor: 'transparent'
          },
          null
        ]
      }}
    >
            <Tab.Screen
        name="MainPage"
        component={MainPageScreen}
        options={{
          tabBarLabel: 'Main', // Dodane: Nazwa kafelka
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../images/Powitanie.png')}
              style={{ tintColor: color, width: 60, height: 50 }}
            />
          ),
          headerTitle: 'Strona Główna', // Dodane: Nazwa ekranu w nagłówku
          headerTitleStyle: styles.headerTitle, // Dodane: Styl dla nazwy ekranu w nagłówku
        }}
      />
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          tabBarLabel: 'Order',
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../images/order-icon.png')}
              style={{ tintColor: color, width: 30, height: 30 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Coupons"
        component={CouponsScreen}
        options={{
          tabBarLabel: 'Kupony',
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../images/coupon-icon.png')}
              style={{ tintColor: color, width: 30, height: 30 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="More"
        component={Opinions}
        options={{
          tabBarLabel: 'Więcej',
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../images/more-icon.png')}
              style={{ tintColor: color, width: 25, height: 25 }}
            />
          ),
        }}
      />
      {/* Dodatkowy kafelk z logo i tekstem motywacyjnym */}
    </Tab.Navigator>
  );
};

// Dodatkowy komponent dla kafelka z logo i tekstem motywacyjnym
const MainPageScreen = () => (
  <View style={styles.container}>
    <Image source={require('../images/Powitanie.png')} style={styles.logo} />
    <Text style={styles.motivationText}>Bądź fit, bądź zdrowy!</Text>
  </View>
);

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#124E78',
    borderTopColor: 'transparent',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FBFFF1',
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  motivationText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    color: '#823329',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff', // Kolor nazwy ekranu w nagłówku
  },
});

export default HomeScreen;