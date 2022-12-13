import axios from "axios";
import { useEffect, useState } from "react";
import { FlatList, Image, ScrollView, StyleSheet, Text, View } from "react-native";


export default function Countries() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('https://restcountries.com/v3.1/all').then(
            (res) => {

                let temp = [];
                let dataAPI = res.data;

                let o = 0;
                while (o < 10) {
                    let num = Math.floor(Math.random() * dataAPI.length);

                    let valueState = temp.map(item => {
                        if (item !== dataAPI[num]) {
                            return false;
                        }
                    }) | true;

                    if (valueState) {
                        temp.push(dataAPI[num]);
                        o++;
                    }
                }

                setData(temp);
            }
        );
    }, [])

    return (
        <ScrollView style={styles.container}>
            {data.map((country, index) => {
                return (
                    <View key={index} style={{ alignItems: "center", margin: 15 }}>
                        <Image style={{ width: 200, height: 200 }} source={{ uri: country.coatOfArms.png }} />
                        <Text style={{ fontSize: 25 }}>Pays: {country.translations.fra.common} </Text>
                        <Text style={{ fontSize: 25 }}>Région: {country.region} </Text>
                    </View>
                );
            })}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%'
    },
});
