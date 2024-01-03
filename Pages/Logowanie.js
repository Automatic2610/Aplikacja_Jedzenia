import { StyleSheet, Text,  View, Button} from 'react-native';
import React from 'react';

export default function Logowanie({navigation}){
    return(
        <View style={styles.przycisk}>
            <Text>Hejo</Text>
            <Button
            style={styles.przycisk}
        title="Go back to Home"
        onPress={() => navigation.navigate('Home')}
      />
        </View>
    )
}

const styles = StyleSheet.create({
    przycisk: {
        top:400,
        width:150,
        left:130
    }
  });
  