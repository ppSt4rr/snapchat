import React, { useState, useEffect, useRef } from "react";

import { Camera, FlashMode } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';
import { Text, TouchableOpacity, View, StyleSheet, Modal, Image } from 'react-native';
import AppIcon from "../components/AppIcon";
import { useNavigation } from "@react-navigation/native";



const CameraScreen = (props) => {

    const [utilisateur, setUtiliser] = useState('')
    const [user, setUser] = useState({})
    const navigation = useNavigation()
    const [allowedCamera, setAllowedCamera] = useState(false);

    const [typeCamera, setTypeCamera] = useState('front')

    const [flashMode, setFlashMode] = useState('off')

    const [imagePreview, setImagePreview] = useState(null)
    const [isOpen, setIsOpen] = useState(false)

    const [others, setOthers] = useState([])


    const changeFlashMode = () => {
        if (flashMode == 'off') {
            setFlashMode('on')

        } else {
            setFlashMode('off')
        }
    }

    const changeCameraType = () => {
        if (typeCamera == 'front') {
            setTypeCamera('back')
        } else if (typeCamera == 'back') {
            setTypeCamera('front');
        } else {
            setTypeCamera('front')
        }
    }

    useEffect(() => {
        allowPermission()
        setUtiliser(props.route.params.user)
    }, [])

    const allowPermission = async () => {
        try {

            const camera = await Permissions.askAsync(Permissions.CAMERA)

            if (!camera.granted) {
                return Permissions.askAsync(Permissions.CAMERA)
            }

            setAllowedCamera(true)

        } catch (error) {

            console.log('erreur camera wsh');
        }
    }

    const camRef = useRef(null)




    const takePicture = async () => {
        setUser(JSON.parse(utilisateur))
        if (!camRef) {
            return
        }

        try {
            const pic = await camRef.current.takePictureAsync()
            setImagePreview(pic.uri)
            setIsOpen(true)
        } catch (error) {
            console.log('erreur foto')
        }
    }

    const closeImagePreview = () => {
        setImagePreview(null)
        setIsOpen(false)
    }

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

    async function convertImage(file) {
        const base64 = await FileSystem.readAsStringAsync(file, { encoding: 'base64' });
        await fetchData().then(() => {
            console.log(others)
            navigation.navigate('Profile', {
                others: others,
                user: user,
                photo: base64
            })
        });

    }


    if (!allowedCamera) {
        return (
            <View style={styles.notAllowed}>
                <TouchableOpacity style={styles.btn} onPress={allowPermission}>
                    <Text style={styles.btnText}>Allow Cameratata permissions </Text>
                </TouchableOpacity>

            </View>
        )
    }


    if (imagePreview) {
        return (
            <Modal animationType='fade' visible={isOpen}>
                <Image source={{ uri: imagePreview }} style={{ height: '100%', width: '100%' }} />
                <View style={styles.actionBottom}>
                    <AppIcon IonName='send-outline' size={25} color='#4a4c4f' />
                    <AppIcon IonName='send-outline' size={25} color='#4a4c4f' style={styles.sendBtn} onPress={() => {
                        convertImage(imagePreview);
                    }} />
                </View>
                <View style={styles.closeBtn}>
                    <AppIcon AntName='close' size={30} color='#eee' onPress={closeImagePreview} />
                </View>
            </Modal>
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <Camera style={{ flex: 1 }}
                type={typeCamera}
                flashMode={flashMode}
                ref={camRef}

            >


                <TouchableOpacity style={styles.captureBtn} onPress={takePicture}></TouchableOpacity>

                <View style={styles.header}>
                    <AppIcon style={styles.headerIcons} AntName="user" color="#eee" size={24} onPress={() => { navigation.navigate('profilpage', { utilisateur: utilisateur }) }} />
                    <AppIcon style={styles.headerIcons} IonName="settings-outline" color="#eee" size={24} />
                </View>

                <View style={styles.sideItems}>
                    <AppIcon style={styles.sideIcons} IonName="camera-outline" color="#eee" size={20} onPress={changeCameraType} />
                    <AppIcon style={styles.sideIcons} IonName={flashMode === 'on' ? 'flash' : 'flash-outline'} color={flashMode === 'on' ? 'yellow' : '#eee'} size={20} onPress={changeFlashMode} />
                    <AppIcon style={styles.sideIcons} IonName="camera-ios-musical-notes-outline" color="#eee" size={20} />
                </View>

            </Camera>

        </View>
    )
}


const styles = StyleSheet.create({
    notAllowed: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btn: {
        padding: 20,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    btnText: {
        color: '#eee',
        fontSize: 20,
        fontWeight: 'bold'
    },
    captureBtn: {
        position: 'absolute',
        bottom: 20,
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 6,
        borderColor: '#fff',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        position: "absolute",
        top: 40,
        justifyContent: "space-between",
        padding: 10,
        flexDirection: 'row',
        width: "100%"
    },
    sideItems: {
        position: "absolute",
        top: 110,
        right: 0,
        padding: 10,
    },
    headerIcons: {
        width: 50,
        height: 50,

    },
    sideIcons: {
        height: 45,
        width: 45,
        marginVertical: 10
    },
    actionBottom: {
        position: 'absolute',
        bottom: 20,
        padding: 10,
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    },
    sendBtn: {
        backgroundColor: 'yellow'
    },
    closeBtn: {
        padding: 10,
        position: "absolute",
        top: 40,
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
})

export default CameraScreen 