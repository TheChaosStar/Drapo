//#region imports
import axios from "axios";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
//#endregion

//#region functions
function Flags(props) {
    //#region consts
    const [flags, setFlags] = useState([]);
    const [currentChars, setCurrentChar] = useState([]);
    const [chars, setChars] = useState([]);
    const step = props.step | 0;
    const maxFlags = props.maxFlags;
    //#endregion

    //#region useEffects
    useEffect(() => {
        let flagArray = [];
        let allCharsNames = [];

        //https://restcountries.com/v3.1/all
        axios.get('https://restcountries.com/v3.1/subregion/europe')
            .then((result) => {
                let dataAPI = result.data;
                let o = 0;
                while (o <= maxFlags) {
                    let num = Math.floor(Math.random() * dataAPI.length);

                    let path = dataAPI[num].flags.png;
                    let name = dataAPI[num].translations.fra.common;
                    let charsName = [];

                    for (let i = 0; i < name.length; i++) {
                        charsName.push(name.charAt(i));
                    }

                    let state = exists(flagArray, path)

                    if (!state) {
                        flagArray.push([path, charsName]);
                        allCharsNames.push(makeChars(charsName));
                        o++;
                    }
                }

                setChars(allCharsNames);
                setFlags(flagArray);

            }).catch((err) => {
                console.log(err);
            });
    }, [])
    //#endregion

    //#region functions
    function drawTouche(allChar) {
        let name = "";
        flags[step][1].forEach(e => {
            name += e;
        });

        console.log(name);

        return (
            <View style={{
                marginTop: 50,
                flexDirection: "row",
                flexWrap: "wrap",
            }}>
                {
                    allChar.map(([e], i) => {
                        return (
                            e == '-' || e == ' ' ?
                                null
                                :
                                <View key={i} style={styles.charCasing}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            let nameUpped = flags[step][1].map(e => e.toUpperCase());
                                            let filter = nameUpped.filter(x => x == e);
                                            if (filter != 0) {
                                                for (let j = 0; j < filter.length; j++) {
                                                    setCurrentChar((c) => [...c, e]);
                                                }
                                            } else setCurrentChar([]);

                                        }}
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: "center",
                                            height: 40,
                                            borderRadius: 5,
                                            margin: 5,
                                        }}
                                        activeOpacity={0.5}
                                    >
                                        <Image style={{
                                            height: 50,
                                            width: 50,
                                            position: "absolute",
                                            zIndex: -1,
                                        }} source={{ uri: "http://www.clker.com/cliparts/5/c/1/a/1367414635115475116free-wood-button-empty_button-md.png" }} />
                                        <Text style={{
                                            zIndex: 1,
                                            color: "#FFF",
                                            fontSize: 24
                                        }}>{e}</Text>
                                    </TouchableOpacity>
                                </View>

                        )

                    })
                }
            </View>
        );

    }

    function drawResult() {
        let str = [];

        flags[step][1].map(e => {
            str.push(e[0].toUpperCase());
        })

        let strCopy = [...str];
        let currentCharsCopy = [...currentChars];

        if (isEqual(strCopy, currentCharsCopy)) {
            setCurrentChar([]);
        }


        return (
            <View style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: "center",
            }}>
                {
                    str.map((e, i) => {
                        return (
                            e == '-' || e == ' ' ?
                                <View key={i} style={styles.charNone}>
                                    <Text>{e}</Text>
                                </View>
                                :
                                <View key={i} style={styles.char}>
                                    {currentChars.map((c, j) => {
                                        if (currentChars.filter(x => x == e).length <= 1) {
                                            if (e === c) {
                                                console.log(c, j);
                                                return <Text key={j}>{c}</Text>
                                            }
                                        } else if (currentChars.filter(x => x == e).length > 1) {
                                            console.log("test");
                                        }
                                    })}
                                </View>
                        );
                    })

                }
            </View>
        );
    }

    //#endregion

    //#region render
    return (
        flags[step] &&
        <>
            <Image style={{ width: 200, height: 150, marginVertical: 25 }} source={{ uri: flags[step][0] }} />

            {drawResult()}

            <Text>{currentChars}</Text>

            {drawTouche(chars[step])}




        </>
    );
    //#endregion
}

const isEqual = (a, b) => JSON.stringify(a.sort()) === JSON.stringify(b.sort());

function exists(arr, search) {
    return arr.some(row => row.includes(search));
}

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

// pas utile
function count(arr) {
    var a = [], b = [], prev;
    var array = [...arr];

    array.sort();
    for (let i = 0; i < array.length; i++) {
        if (array[i] !== prev) {
            a.push(array[i]);
            b.push(1);
        } else {
            b[b.length - 1]++;
        }
        prev = array[i];
    }

    return [a, b];
}

function makeAdditionnalChar(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var charactersLength = characters.length;

    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function makeChars(chars) {
    let str = [];

    chars.map((e, i) => {
        if (e !== ' ' || e !== '-')
            str.push(e[0].toUpperCase());
    })

    if (str.length < 25) {
        let l = (20 + (str.filter(x => x == "-").length + str.filter(x => x == " ").length)) - str.length;
        let strExtend = makeAdditionnalChar(l);

        for (let i = 0; i < strExtend.length; i++) {
            str.push(strExtend.charAt(i))
        }
    }

    shuffle(str);

    return str;
}
//#endregion

//#region exports
export default Flags;
//#endregion

//#region Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%'
    },

    charCasing: {
        flex: 1,
        minWidth: 50,
        maxWidth: 50,
        height: 50,
        margin: 10,
        justifyContent: "center",
        alignItems: "center"
    },

    char: {
        marginVertical: 16,
        width: 16,
        height: 16,
        borderBottomWidth: 1,
        marginHorizontal: 5,
        justifyContent: "center",
        alignItems: "center",
    },

    charNone: {
        marginVertical: 16,
        width: 16,
        height: 16,
        justifyContent: "center",
        alignItems: "center",
    },


});
//#endregion