import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useLayoutEffect, useState } from "react";
import { Text, SafeAreaView, Button, View, StyleSheet, TextBase, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import React from "react";


const Profilpage = (props) => {

    const [User, setUser] = useState({})

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
        },
        textLinkDelete: {
            backgroundColor: 'red',
            fontSize: 15,
            fontWeight: 'bold',
            textAlign: 'center',
            color: '#fff',
            marginTop: '100%',
            paddingTop: 10,
            height: '10%'
        },
        text: {
            fontSize: 25,
            textAlign: 'center'
        },
        container: {
            flex: 1
        }
    });

    useEffect(() => {
        const user = props.route.params.utilisateur
        const rebase = async () => {
            const guy = await JSON.parse(user)
            return guy
        }
        rebase().then((guy) => {
            setUser(guy)
        })
    }, [])

    function deleteUser() {
        try {
            fetch('https://mysnapchat.epidoc.eu/user', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + JSON.parse(utilisateur).token
                }
            }).then(res => {
                navigation.navigate('Accueil')
            })
            console.log('delete');
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.link} onPress={async () => {
                try {
                    console.log('déco')
                    await AsyncStorage.removeItem("user");
                    navigation.navigate("Accueil");
                } catch (err) {
                    console.log(err);
                }
            }}>
                <Text style={styles.textLink}>Déconnexion</Text>
            </TouchableOpacity>
            <View>
                <Text style={styles.text}>
                    Bonjour {User.username}
                </Text>
            </View>
            <TouchableOpacity>
                <Text style={styles.textLinkDelete} onPress={deleteUser}>
                    Supprimer le compte
                </Text>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: 'space-around', height: '6%', marginTop: '25%', borderTopWidth: 1, borderTopColor: '#ccc' }}>
                <TouchableOpacity style={styles.appButtonContainer} onPress={() => {
                    navigation.navigate('Snaps', {
                        user: User
                    })
                }}>
                    <Text>Messages</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.appButtonContainer} onPress={() => {
                    navigation.navigate('camera', {
                        user: User
                    })
                }}>
                    <Text>Snap</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.appButtonContainer} onPress={() => {
                    navigation.navigate('profilpage', {
                        user: User
                    })
                }}>
                    <Text>Profil</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default Profilpage