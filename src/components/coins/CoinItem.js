import React from 'react';
import { View, Text, Pressable, StyleSheet, Platform } from 'react-native';
import Colors from 'cryptoTracker/src/resources/colors';

const CoinsItem = ({ item, onPress }) => {

    const currencyFormat = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    return (

        <Pressable onPress={onPress} style={styles.containerRow}>

            <View style={styles.containerCol}>
                <View style={styles.itemRow}>
                    <Text style={styles.symbolText}>{item.symbol}</Text>
                    <Text style={styles.nameText}>{item.name}</Text>
                </View>

                <Text style={item.percent_change_1h > 0 ? styles.goUpPercent : item.percent_change_1h < 0 ? styles.goDownPercent : styles.percentText}>{item.percent_change_1h}</Text>
            </View>

            <View style={styles.containerCol}>
                <Text style={styles.priceText}>{currencyFormat.format(item.price_usd)}</Text>
            </View>

        </Pressable>

    );
}

const styles = StyleSheet.create({
    containerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: Colors.zircon,
        borderBottomWidth: 1,
        alignItems: 'center',
        marginStart: Platform.OS === 'android' ? 16 : 0,
        backgroundColor: Colors.charade
    },
    containerCol: {
        flexDirection: 'column',
        padding: 16,
    },
    itemRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    symbolText: {
        color: Colors.white,
        fontSize: 18,
        marginEnd: 16
    },
    nameText: {
        color: Colors.white,
        fontSize: 16
    },
    priceText: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: 'bold'
    },
    percentText: {
        color: Colors.white,
    },
    goUpPercent: {
        color: Colors.green,
    },
    goDownPercent: {
        color: Colors.red,
    },
});

export default CoinsItem;