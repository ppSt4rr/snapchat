import { SafeAreaView } from "react-native-safe-area-context";
import { ViewPropsIOS, TextInput, View, Button, StyleSheet, Text } from "react-native"
import { useState, useLayoutEffect } from "react";

const styles = StyleSheet.create({
    input: {
        width: '90%',
        height: 50,
        borderColor: 'blue',
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        margin: '5%',
        fontSize: 18,
        color: '#3578E5'
    },
});

function Register({ navigation }) {
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('')

    async function enregistre() {
        if (mail === "" || password === "" || name === "") {
            return;
        }
        const body = {
            email: mail,
            password: password,
            profilePicture: "",
            username: name
        }

        await fetch('https://mysnapchat.epidoc.eu/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                navigation.navigate('Login')
            })
            .catch((err) => {
                setError(err.data)
                alert(error.data);
            }
            )
    }

    return (
        <SafeAreaView style={{
            flex: 1,
            justifyContent: 'center',

        }}>
            <View>
                <View><Text>{error}</Text></View>
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    onChangeText={newText => setName(newText)}
                />
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
                <Button
                    title="Register"
                    onPress={enregistre}
                />
            </View>
        </SafeAreaView>
    )
}

export default Register;