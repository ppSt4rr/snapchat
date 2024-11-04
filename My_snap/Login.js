import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput, View, Text, Button, StyleSheet, Pressable } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
    connexion: {
        bottom: 150,
        width: '50%',
        fontSize: 25,
        borderColor: 'black',
        color: '#b95765',
        marginLeft: '34%',
        marginBottom: '10%',
        fontWeight: 'bold',
    },
    back: {
        backgroundColor: '#fffc00',
        flex: 1,
        justifyContent: 'center',
    },
    input: {
        width: '80%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        backgroundColor: '#f2f2f2',
        marginBottom: 10,
        fontSize: 16,
        bottom: 150,
        marginLeft: '10%',
        margin: 10,

    },
    btnLog: {
        width: '50%',
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#b95765',
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 80,
        marginLeft: '25%'
    },
    btnText: {
        color: '#fff',
        fontSize: 16,
    }
});

function Login() {
    const navigation = useNavigation()
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    async function log() {
        if (!mail || !password) {
            alert('Remplissez tous les champs !');
            return;
        }
        try {
            let donnees;
            await fetch("https://mysnapchat.epidoc.eu/user", {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    email: mail,
                    password: password
                })
            }).then(res => { return res.json() }).then(data => {
                donnees = data.data;
                console.log(donnees)
            })
            await AsyncStorage.setItem('user', JSON.stringify(donnees))
            const utilisateur = await AsyncStorage.getItem('user').then(value => { return value })
            if (JSON.parse(utilisateur).token) {
                console.log(utilisateur)
                navigation.navigate('camera', {
                    user: utilisateur
                })
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <SafeAreaView style={styles.back}>
            <View >
                <Text style={styles.connexion}>Connexion</Text>
                <TextInput
                    style={styles.input}
                    placeholder="E-mail"
                    onChangeText={newText => setMail(newText)}
                    defaultValue={mail} />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    onChangeText={newText => setPassword(newText)}
                    secureTextEntry={true} />
                <Pressable
                    title="Log In"
                    style={styles.btnLog}
                    onPress={log}>
                    <Text styles={styles.btnText}>Log in</Text>
                </Pressable>

            </View>
        </SafeAreaView>
    )
}

export default Login;