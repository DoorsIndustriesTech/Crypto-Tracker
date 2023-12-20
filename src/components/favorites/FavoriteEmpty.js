import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from 'cryptoTracker/src/resources/colors';

const FavoriteEmpty = () => {

    return (

        <View style={styles.container}>
            <Text style={styles.text}>You don't have favorite currencies</Text>
        </View>

    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: Colors.zircon,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
    }
});

export default FavoriteEmpty;