import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Progress from 'react-native-progress';

function Timer(props) {
    const [timer, setTimer] = useState(0);
    const id = useRef(null);
    const interval = props.interval;

    const clear = () => {
        window.clearInterval(id.current); // On supprime le timer
        props.onFinish(); // Fait en sorte le compteur augmente
        //props.clearText();
        createInterval(); // On recrÃ©e un timer
    }

    function createInterval() {
        setTimer(interval);
        id.current = window.setInterval(() => {
            setTimer((time) => time - 1);
        }, 1000);
    }

    useEffect(() => {
        createInterval();
    }, [])

    useEffect(() => {
        if (timer === 0) {
            clear();
        }
    }, [timer]);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{timer} secondes</Text>
            <Progress.Bar style={styles.progress} progress={(timer / interval)} width={200} height={10} />
        </View>
    );
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        width: '100%',
        marginTop: 25,
    },


    text: {
        textAlign: "center",
        color: "black",
        fontWeight: "bold"
    },

    progress: {
        height: 10,
        alignSelf: "center"
    }

})

export default Timer;