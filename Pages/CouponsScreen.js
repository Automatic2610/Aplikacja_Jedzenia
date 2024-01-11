// CouponsScreen.js
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, Pressable, Clipboard } from 'react-native';

const CouponsScreen = () => {
  const dishes = [
    { id: 1, image: require('../images/spagetti.png'), code: 'ABC123', offer: 'Kod zniżkowy 10%' },
    { id: 2, image: require('../images/chicken.png'), code: 'DEF456', offer: 'Kod zniżkowy 10%' },
    { id: 3, image: require('../images/salad.png'), code: 'GHI789', offer: 'Kod zniżkowy 10%' },
    { id: 4, image: require('../images/fries.png'), code: 'JKL012', offer: 'Frytki 1 plus 1 gratis' },
    { id: 5, image: require('../images/steak.png'), code: 'MNO345', offer: 'Kod zniżkowy 10%' },
    { id: 6, image: require('../images/pizza_slice.png'), code: 'PQR678', offer: 'Kod zniżkowy 15%' },
  ];

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCode, setSelectedCode] = useState('');
  const [offerText, setOfferText] = useState('');

  const handlePress = (code, offer) => {
    setSelectedCode(code);
    setOfferText(offer);
    setModalVisible(true);
  };

  const handleCopyCode = () => {
    Clipboard.setString(selectedCode);
    setModalVisible(false);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>☀️ Dzisiejsze Kupony 🌛</Text>
      <View style={styles.dishesContainer}>
        {dishes.map((dish) => (
          <TouchableOpacity key={dish.id} style={styles.dishItem} onPress={() => handlePress(dish.code, dish.offer)}>
            <Image source={dish.image} style={styles.dishImage} />
          </TouchableOpacity>
        ))}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalOfferText}>{offerText}</Text>
            <Text style={styles.modalText}>{selectedCode}</Text>
            <View style={styles.buttonsContainer}>
              <Pressable style={styles.copyButton} onPress={handleCopyCode}>
                <Text style={styles.buttonText}>Skopiuj kod</Text>
              </Pressable>
              <Pressable style={styles.closeButton} onPress={handleCloseModal}>
                <Text style={styles.buttonText}>Anuluj</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FBFFF1',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: 20,
    color: '#823329',
    textAlign: 'center',
  },
  dishesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 50,
  },
  dishItem: {
    margin: 10,
    borderRadius: 15,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#FF914C',
  },
  dishImage: {
    width: 120,
    height: 120,
    resizeMode: 'cover',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#B4C5E4',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#124E78',
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  copyButton: {
    backgroundColor: '#FF914C',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  closeButton: {
    backgroundColor: '#D3D3D3',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOfferText: {
    fontSize: 18,
    marginBottom: 10,
    color: '#823329',
  },
});

export default CouponsScreen;
