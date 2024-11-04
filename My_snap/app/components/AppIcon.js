import React from "react";


import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons'; 
// import {AntDesign, Ionicons} from '@expo/vector-icons';

const AppIcon = ({AntName, IonName, style, color, size, onPress}) => {
    return (
        <View>
            <TouchableOpacity style={[styles.icons,{...style}]} onPress={onPress}>
                {AntName && <AntDesign name={AntName} size={size} color={color} />}
                {IonName && <Ionicons name={IonName} size={size} color={color} />}
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    icons:{
        height: 60,
        width:60,
        borderRadius:100,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#4a4c4f'
    }
})

export default AppIcon