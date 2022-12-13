import { Button, Pressable, StyleSheet, Text, View } from "react-native";

export default function Home({navigation}) {
    return(
        <View style={styles.container}>
            <Text style={styles.h1}>Drapo</Text>
            <Pressable style={styles.playButton} onPress={() => navigation.navigate('Game')} >
                <Text style={styles.playButtonText} >Play</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around"
    },

    h1: {
        fontSize: 45,
        fontWeight: 'bold',
    },

    playButton: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 12, // 12
        paddingHorizontal: 32, // 32
        borderRadius: 4,
        elevation: 3,
        backgroundColor: "#6565FF"
    },
    playButtonText: {
        fontSize: 16, // 16
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white'
    }

});
