import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { Text, SafeAreaView, Button, View, StyleSheet, TextBase, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { Picker } from "react-native-web";

export default function Header() {

    const navigation = useNavigation()
    const styles = StyleSheet.create({
        link: {
            borderColor: 'blue',
            backgroundColor: 'blue',
            padding: 10,
            borderWidth: 1,
            borderRadius: 5,
            margin: '3%',
            marginLeft: '55%',
            color: '#fff'
        },
        textLink: {
            fontSize: 15,
            fontWeight: 'bold',
            textAlign: 'center',
            color: '#fff'
        }
    });

    return (
        <SafeAreaView>
            <Picker></Picker>
        </SafeAreaView>
    );
}