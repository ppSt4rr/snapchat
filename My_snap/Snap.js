import { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";

export default function Snaps(props) {
    const [user, setUser] = useState({})
    const [snaps, setSnaps] = useState([])
    const [hasSnaps, setHasSnaps] = useState(false)
    useEffect(() => {
        setUser(props.route.params.user)
        fetchSnap()
    }, [user])
    function fetchSnap() {
        fetch('https://mysnapchat.epidoc.eu/snap', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + user.token
            },
        }).then(res => res.json()).then(data => {
            if (data.data.length !== 0) {
                setSnaps(data.data);
                setHasSnaps(true)
            }
        })
    }
    if (snaps.length == 0) {
        return <Text>No snaps</Text>
    }
    if (hasSnaps) {
        console.log(snaps)
        return (
            <View>
                <ScrollView>
                    <Text>Vous avez des Snaps en attente</Text>
                </ScrollView>
            </View>
        )
    } else {
        return (
            <View>
                <Text>
                    Snaps
                </Text>
            </View>
        )
    }
}