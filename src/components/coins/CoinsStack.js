import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CoinsScreen from "./CoinsScreen";
import CoinDetailsScreen from "../coinDetail/CoinDetailsScreen";
import Colors from '../../resources/colors';

const Stack = createStackNavigator();

const CoinsStack = () => {

    return (

        <Stack.Navigator
            screenOptions={{
                headerStyle : {
                    backgroundColor: Colors.blackPearl,
                    shadowColor: Colors.blackPearl 
                },
                headerTintColor: Colors.white
            }}
        >
            <Stack.Screen name="Coins" component={CoinsScreen} />
            <Stack.Screen name="Coin Details" component={CoinDetailsScreen}></Stack.Screen>
        </Stack.Navigator>

    );

}

export default CoinsStack;