import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FavoritesScreen from './FavoritesScreen';
import Colors from 'cryptoTracker/src/resources/colors';
import FavoriteDetailsScreen from 'cryptoTracker/src/components/coinDetail/CoinDetailsScreen';

const Stack = createStackNavigator();


const FavoritesStack = () => {

    return (

        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: Colors.blackPearl,
                    shadowColor: Colors.blackPearl
                },
                headerTintColor: Colors.white
            }}
        >
            <Stack.Screen
                name='Favorite Currencies'
                component={FavoritesScreen}
            />
            <Stack.Screen
                name='Favorite Details'
                component={FavoriteDetailsScreen}
            />
        </Stack.Navigator>

    );

}

export default FavoritesStack;