import { Text, View, SafeAreaView, ScrollView, StyleSheet, Button, TouchableOpacity } from "react-native"
import { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";

const styles = StyleSheet.create({
    container: {
        flex: 2,
        backgroundColor: '#fffc00'
    },
    scroll: {
        height: '50%'
    },
    div: {
        width: '50%',
        borderStyle: 'solid',
        borderWidth: 1,
        marginTop: 20,
        marginLeft: 10,
        padding: 10,
        backgroundColor: '#b95765',
        borderRadius: 5,
    },
    divText: {
        fontWeight: 'bold'
    },
    appButtonContainer: {
        fontSize: 14,
    }
})

function Profile(props) {
    const navigation = useNavigation()
    const [user, setUser] = useState({})
    const [others, setOthers] = useState([])
    const [photo, setPhoto] = useState('')
    const [time, setTime] = useState(5);

    useEffect(() => {
        const setup = async () => {
            setUser(props.route.params.user)
            setPhoto(props.route.params.photo)
        }
        setup().then(() => {
            fetchData();
        })
    }, [user])

    async function fetchData() {
        try {
            const res = await fetch('https://mysnapchat.epidoc.eu/user', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + user.token
                }
            })
            const data = await res.json()
            setOthers(data.data.reverse())
        } catch (e) {
            console.log(e)
        }
    }

    const handlePress = async (event) => {
        const snap = {
            to: event,
            image: photo,
            duration: time
        }
        fetch("https://mysnapchat.epidoc.eu/snap", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.token
            },
            body: JSON.stringify(snap)
        }).then(res => { return res.json() }).then(donnees => {
            console.log(donnees)
        }).catch(error => {
            console.log(error.stack)
        })
    }
    const otherUsers = others.map((other) => {
        return (
            <TouchableOpacity key={other._id} style={styles.div} onPress={(key) => { handlePress(other._id) }}>
                <Text style={styles.divText}>{other.username}</Text>
            </TouchableOpacity>
        )
    })
    return (
        <SafeAreaView style={styles.container}>
            <Picker
                selectedValue={time}
                onValueChange={(itemValue) => setTime(itemValue)}>
                <Picker.Item label="5" value="5" />
                <Picker.Item label="10" value="10" />
                <Picker.Item label="30" value="30" />
                <Picker.Item label="60" value="60" />
            </Picker>
            <Text style={{ fontSize: 25, textDecorationLine: "underline", lineHeight: 50, marginLeft: 10 }}>Voici les autres utilisateurs :</Text>
            <ScrollView style={styles.scroll}>{otherUsers}</ScrollView>
            <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: 'space-around', height: '6%', marginTop: 20, borderTopWidth: 1, borderTopColor: '#ccc' }}>
                <TouchableOpacity style={styles.appButtonContainer} onPress={() => {
                    navigation.navigate('Snaps', {
                        user: user
                    })
                }}>
                    <Text>Messages</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.appButtonContainer} onPress={() => {
                    navigation.navigate('camera', {
                        user: user
                    })
                }}>
                    <Text>Snap</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.appButtonContainer} onPress={() => {
                    navigation.navigate('profilpage', {
                        user: user
                    })
                }}>
                    <Text>Profil</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default Profile;