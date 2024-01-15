import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import COLORS from '../Components/COLORS.js'
const Button = ({
    title, 
    onPress = () => {}
}) => {
    return (
        <TouchableOpacity onPress={onPress} style={{
            height:55,
            width: '100%',
            backgroundColor: COLORS.orange,
            justifyContent:'center',
            alignItems:'center',
            borderRadius:15,
            marginVertical:20
        }}>
            <Text style={{color:COLORS.dark, fontWeight:'bold', fontSize: 18, textAlign:'center'}} >{title}</Text>
        </TouchableOpacity>
    );
};

export default Button;