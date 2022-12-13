import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Flags from "./func/Flags";
import Timer from "./func/Timer";

export default function Home({navigation}) {
    const [step, setStep] = useState(0);
    const [finishing, onFinish] = useState(false);
    const maxFlags = 10;
    const interval = 30;

    if (step > maxFlags) {
        navigation.navigate('Home');
    }

    if (finishing && step <= maxFlags) {
        setStep(step + 1);
        onFinish(false);
    }

    return (
        <View style={styles.container}>
            <View style={{ alignItems: "center", margin: 15 }}>
                {/* {step <= maxFlags && <Timer onFinish={() => onFinish(true)} interval={interval} /> } */}
                <Flags step={step} maxFlags={maxFlags} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%'
    },

    char: {
        width: 25,
        height: 25,
        borderBottomWidth: 1,
        marginHorizontal: 5,
        justifyContent: "center",
        alignItems: "center",
    },

    charSpace: {
        width: 25,
        height: 25,
        justifyContent: "center",
        alignItems: "center",
    },

    text: {
        textAlign: "center",
        //color: "white",
        fontWeight: "bold"
    },

    progress: {
        height: 10,
        alignSelf: "center"
    }

});
