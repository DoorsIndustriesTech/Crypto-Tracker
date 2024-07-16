import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../../resources/colors';

const CoinMarketsItem = ({ item }) => {

    const currencyFormat = Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    })

    return (

        <View style={styles.container}>
            <Text style={styles.marketNameText}>{item.name} : </Text>
            <Text style={styles.marketNameText}>{currencyFormat.format(item.price_usd)}</Text>
        </View>

    );

}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        borderColor: Colors.zircon,
        borderWidth: 1,
        paddingHorizontal: 16,
        marginRight: 8
    },
    marketNameText: {
        color: Colors.white,
        fontWeight: 'bold'
    },
    priceText: {
        color: Colors.white,
        fontWeight: 'bold'
    }
});

export default CoinMarketsItem;