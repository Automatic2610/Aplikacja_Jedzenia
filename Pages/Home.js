import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.zdjecie}>
        <Image source={require("../images/Powitanie.png")} />
      </View>

      <View style={styles.przejscie}>
        <TouchableOpacity onPress={() => navigation.navigate('Rejestracja')}>
          <View style={styles.Zapraszamy}>
            <Text style={styles.text}>Zapraszamy</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF914C',
  },
  zdjecie: {
    width: 300,
    height: 300,
    paddingTop: 30,
    right: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  przejscie: {
    top: 400,
    left:100,
  },
  text: {
    fontSize: 24,
    fontStyle: 'italic',
  },
  Zapraszamy: {
    width:200,
    backgroundColor: '#FF914C',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#803200',
    borderWidth: 5,
  },
});