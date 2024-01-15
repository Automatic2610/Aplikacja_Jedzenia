import { StyleSheet, Text, TouchableOpacity, View, Image, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import COLORS from './Components/COLORS';
export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.zdjecie}>
        <Image source={require("../images/Powitanie.png")} />
      </View>
      <View>
      <Text style={styles.tekst}>Bądź fit, bądź zdrowy!
      <Icon name='heart' style={{color:'red', fontSize:24}}></Icon>
      </Text>
      </View>
      <View style={styles.przejscie}>
      <Pressable style={styles.przycisk} title="Zapraszamy" onPress={() => navigation.navigate('Rejestracja')} >
            <Text style={{              color: COLORS.ivory,
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 24,}}>Zapraszamy !</Text>
            </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tekst:{
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    color: COLORS.brown,
  },
  przycisk:{
    color:COLORS.ivory,
    height:55,
    width: '80%',
    backgroundColor: COLORS.orange,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:15,
    marginVertical:20,
    borderColor:COLORS.brown,
    borderWidth:3,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.ivory,
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
    left:40,
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