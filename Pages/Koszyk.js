import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Modal, TouchableHighlight, TextInput, Clipboard } from 'react-native';

const Koszyk = ({ route, navigation }) => {
  const { selectedDishes, restaurant } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [discountModalVisible, setDiscountModalVisible] = useState(false);
  const [enteredDiscountCode, setEnteredDiscountCode] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [formattedPreparationTime, setFormattedPreparationTime] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);

  useEffect(() => {
    const longestPreparationTime = Math.max(0, ...selectedDishes.map((dish) => parseInt(dish.preparationTime.replace(' min', ''), 10)));
    const totalPreparationTime = longestPreparationTime + Math.ceil(longestPreparationTime * 0.20);
    const hours = Math.floor(totalPreparationTime / 60);
    const minutes = totalPreparationTime % 60;
    const formattedTime = `${hours} godz. ${minutes} min.`;setFormattedPreparationTime(formattedTime);}, [selectedDishes]);

  const initialTotalPrice = selectedDishes.reduce((total, dish) => total + parseFloat(dish.price.replace(' zł', '')), 0).toFixed(2);
  const [totalPrice, setTotalPrice] = useState(initialTotalPrice);

  const handleAddressClick = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleApplyDiscount = () => {
    const coupons = [
      { code: 'ABC123', discountPercentage: 10 },
      { code: 'DEF456', discountPercentage: 10 },
      { code: 'GHI789', discountPercentage: 10 },
      { code: 'JKL012', discountPercentage: 10 },
      { code: 'MNO345', discountPercentage: 10 },
      { code: 'PQR678', discountPercentage: 15 },
    ];

    const coupon = coupons.find((coupon) => coupon.code === enteredDiscountCode);
    if (coupon) {
      const discountAmount = (totalPrice * (coupon.discountPercentage / 100)).toFixed(2);
      const discountedTotal = (totalPrice - discountAmount).toFixed(2);
      setTotalPrice(discountedTotal);
      setDiscountPercentage(coupon.discountPercentage);
      setDiscountApplied(true);
      setDiscountModalVisible(false);
    } else {
      alert('Nieprawidłowy kod rabatowy');
    }
  };

  const handleCopyCode = () => {
    Clipboard.setString(enteredDiscountCode);
    setDiscountModalVisible(false);
  };

  const handleCloseModal = () => {
    setDiscountModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.contentContainer}>
          <Text style={styles.headerText}>Twój koszyk:</Text>
          <Text style={styles.restaurantName}>{restaurant.name}</Text>
          <View style={styles.dishContainer}>
            {selectedDishes.map((dish) => (
              <View key={dish.id} style={styles.selectedDish}>
                <Text style={styles.dishName}>{dish.name}</Text>
                <Text>{`Cena: ${dish.price}`}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      <View style={styles.bottomContainer}>
        {!discountApplied && (
          <TouchableOpacity onPress={() => setDiscountModalVisible(true)}>
            <Text style={styles.discountButton}>Wprowadź kod rabatowy</Text>
          </TouchableOpacity>
        )}
        <Text style={styles.totalText}>{`Cena: ${totalPrice} zł`}</Text>
        <Text style={styles.totalText}>{`Czas oczekiwania: ${formattedPreparationTime}`}</Text>
        <TouchableOpacity onPress={handleAddressClick}>
          <Image source={require('../images/adres.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.orderButton}
          onPress={() => navigation.navigate('OrderConfirmation', { deliveryTime: formattedPreparationTime })}
        >
          <Text style={styles.orderButtonText}>Zamów</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.backButtonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Powrót</Text>
        </TouchableOpacity>
      </View>
      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={closeModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Informacja o dostawie</Text>
            <Text>Zamówienie zostanie dostarczone na adres podany przez Ciebie przy rejestracji</Text>
            <TouchableHighlight style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Zamknij</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
      <Modal animationType="slide" transparent={true} visible={discountModalVisible} onRequestClose={handleCloseModal}>
        <View style={styles.discountModalContainer}>
          <View style={styles.discountModalContent}>
            <Text style={styles.discountModalTitle}>Wprowadź kod rabatowy</Text>
            <TextInput
              style={styles.discountInput}
              placeholder="Wprowadź kod rabatowy"
              onChangeText={(text) => setEnteredDiscountCode(text)}
              editable={!discountApplied}
            />
            <TouchableOpacity style={styles.applyDiscountButton} onPress={handleApplyDiscount}>
              <Text style={styles.applyDiscountButtonText}>Zastosuj kod</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeDiscountModalButton} onPress={handleCloseModal}>
              <Text style={styles.closeDiscountModalButtonText}>Anuluj</Text>
            </TouchableOpacity>
            {discountApplied && (
              <Text style={styles.discountAppliedText}>Rabat został już zastosowany.</Text>
            )}
            <TouchableOpacity style={styles.copyButton} onPress={handleCopyCode}>
              <Text style={styles.buttonText}>Skopiuj kod</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFFF1',
  },
  scrollView: {
    flex: 0.5,
  },
  icon: {
    width: 50,
    height: 50,
    marginTop: 10,
  },
  bottomContainer: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FBFFF1',
    paddingBottom: 150,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
    backgroundColor: '#FBFFF1',
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    padding: 10,
    backgroundColor: '#ff914c',
    textAlign: 'center',
    borderRadius: 10,
    color: 'black',
    marginTop: 20,
    marginBottom: 20,
  },
  dishContainer: {
    width: '80%',
  },
  selectedDish: {
    marginBottom: 10,
    padding: 5,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#ff914c',
  },
  dishName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  discountButton: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#ff914c',
  },
  orderButton: {
    backgroundColor: '#ff914c',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  backButtonContainer: {
    position: 'absolute',
    right: 20,
    bottom: 20,
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
  orderButtonText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#ff914c',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  discountModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  discountModalContent: {
    backgroundColor: '#FBFFF1',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  discountModalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#124E78',
  },
  discountInput: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  applyDiscountButton: {
    backgroundColor: '#FF914C',
    padding: 10,
    borderRadius: 5,
    width: '100%',
  },
  applyDiscountButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  closeDiscountModalButton: {
    backgroundColor: '#D3D3D3',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    marginTop: 10,
  },
  closeDiscountModalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  discountAppliedText: {
    fontSize: 16,
    color: '#FF914C',
    marginTop: 10,
  },
  copyButton: {
    backgroundColor: '#ff914c',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Koszyk;
