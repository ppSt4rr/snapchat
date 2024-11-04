import { SafeAreaView } from "react-native-safe-area-context"
import { View, StyleSheet, Text, TouchableOpacity } from "react-native"
import LinearGradient from 'react-native-linear-gradient';
import Bulbizarre from "./Buli";

const styles = StyleSheet.create({
    containerzz: {
        height: '100%',
        backgroundColor: '#fffc00'
    },
    container: {
        marginTop: '40%',
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttons: {
        flexDirection: 'column',
        justifyContent: 'center',
        width: '50%',
        marginLeft: '25%'
    },
    button: {
        borderRadius: 10,
        margin: 10,
        borderColor: 'black',
        borderWidth: 1,
        cursor: 'pointer'
    },
    buttonLogin: {
        backgroundColor: '#b95765',
        padding: 10
    },
    buttonRegister: {
        backgroundColor: '#b95765',
        padding: 10
    },
    labelButton: {
        color: 'white',
        fontSize: 20,
        textShadowColor: 'black',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5,
        fontWeight: 'bold',
        textAlign: 'center'
    }
});

function HomeScreen({ navigation }) {

    return (
        <SafeAreaView style={styles.containerzz}>
            <View style={styles.container}>
                <Text style={{
                    fontFamily: "sans-serif",
                    textAlign: 'center',
                    fontSize: 25,
                    backgroundColor: 'transparent',
                }}>
                    Snaptchatche
                </Text>

            </View>

            <View style={styles.buttons}>
                <TouchableOpacity style={[styles.button, styles.buttonLogin]}><Text style={styles.labelButton} onPress={() =>
                    navigation.navigate('Login')
                }>Login</Text></TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.buttonRegister]}><Text style={styles.labelButton} onPress={() =>
                    navigation.navigate('Register')
                }>Register</Text></TouchableOpacity>
                <Bulbizarre />
            </View>

        </SafeAreaView>
    )
}

export default HomeScreen;