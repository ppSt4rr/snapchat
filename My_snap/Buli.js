import { Image, StyleSheet, View } from "react-native"

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 200,
        height: 300,
        resizeMode: 'contain'
    }
})

const Bulbizarre = () => {
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require('./assets/Bulbizarre.png')} />
        </View>
    );
}

export default Bulbizarre;