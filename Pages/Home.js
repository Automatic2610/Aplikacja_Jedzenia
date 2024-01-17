import { StyleSheet, Text, Pressable, View, Image } from 'react-native';
import COLORS from './Components/COLORS';

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../images/logo.png')} style={styles.logo} />
      </View>
      <View style={styles.mottoContainer}>
        <View style={styles.mottoBackground}>
          <Text style={styles.mottoText}>
            Zamawiaj pyszne jedzenie i ciesz się smakiem z dostawą pod drzwi!
          </Text>
        </View>
      </View>
      <View style={styles.przyciskContainer}>
        <Pressable 
          style={styles.przycisk} 
          onPress={() => navigation.navigate('Logowanie')}
        >
          <Text style={styles.przyciskText}>Zapraszamy</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FBFFF1',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 300,
    height: 200,
  },
  mottoContainer: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
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
  przyciskContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  przycisk: {
    backgroundColor: COLORS.orange,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderColor: COLORS.brown,
    borderWidth: 3,
  },
  przyciskText: {
    color: COLORS.ivory,
    fontSize: 24,
  },
});
