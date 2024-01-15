import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet, View, Text } from 'react-native';
import MapScreen from './MapScreen';
import CouponsScreen from './CouponsScreen';
import MoreScreen from './MoreScreen';

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  return (
    <Tab.Navigator
      initialRouteName="MainPage"
      screenOptions={{
        tabBarActiveTintColor: '#FF914C',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: { fontSize: 16, fontWeight: 'bold' },
        tabBarStyle: { display: 'flex' },
      }}
    >
      <Tab.Screen
        name="MainPage"
        component={MainPageScreen}
        options={{
          tabBarLabel: 'Main',
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../images/logo.png')}
              style={{ tintColor: color, width: 60, height: 50 }}
            />
          ),
          headerShown: false,
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
          headerShown: false,
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
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="More"
        component={MoreScreen}
        options={{
          tabBarLabel: 'Więcej',
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../images/more-icon.png')}
              style={{ tintColor: color, width: 30, height: 30 }}
            />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

const MainPageScreen = () => (
  <View style={styles.container}>
    <Image source={require('../images/logo.png')} style={styles.logo} />
    <View style={styles.mottoContainer}>
      <View style={styles.mottoBackground}>
        <Text style={styles.mottoText}>
          Zamawiaj pyszne jedzenie i ciesz się smakiem z dostawą pod drzwi!
        </Text>
      </View>
    </View>
    <View style={styles.deliveryContainer}>
      <Image source={require('../images/delivery.png')} style={styles.deliveryImage} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FBFFF1',
  },
  logo: {
    width: 300,
    height: 200,
  },
  mottoContainer: {
    marginTop: 80,
  },
  mottoBackground: {
    backgroundColor: '#124E78',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
  },
  mottoText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FBFFF1',
    lineHeight: 30,
  },
  deliveryContainer: {
    marginTop: 80,
    padding: 20,
    borderRadius: 15,
  },
  deliveryImage: {
    width: 350,
    height: 150,
    resizeMode: 'contain',
  },
});

export default HomeScreen;