import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useParams } from 'react-router';
import Bulbizarre from "./Buli";

export default function Friend(props) {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }
    })
    const navigation = useNavigation();
    const param = props.route.params;
    const [image, setimage] = useState('')
    const [userinfo, setInfo] = useState({})
    const user = param.user
    useEffect(() => {
        fetch('https://mysnapchat.epidoc.eu/user/' + param.event, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + JSON.parse(user).token
            }
        }).then(res => res.json()).then(data => {
            setInfo(data.data)
        })
    }, [userinfo])
    return (
        <View style={styles.container}>
            <Text>Profil de "{userinfo.username}"</Text>
            <Image source={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==' }} style={{
                borderRadius: 10,
                marginTop: '5%'
            }} />
            <Bulbizarre />
        </View>
    )
}