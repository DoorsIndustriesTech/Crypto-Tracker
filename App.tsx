/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBank, faStar } from '@fortawesome/free-solid-svg-icons';
import Colors from './src/resources/colors';
import CoinStack from './src/components/coins/CoinsStack';
import FavoritesStack from './src/components/favorites/FavoritesStack';

const Tabs = createBottomTabNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Tabs.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: Colors.blackPearl
          }
        }}

      >
        <Tabs.Screen
          name='Currencies'
          component={CoinStack}
          options={{
            tabBarIcon: ({ focused, color, size }) =>
              <FontAwesomeIcon
                icon={faBank}
                size={size}
                color={color}
              />,
          }}
        />

        <Tabs.Screen
          name='Favorites'
          component={FavoritesStack}
          options={{
            tabBarIcon: ({ focused, color, size }) =>
              <FontAwesomeIcon
                icon={faStar}
                size={size}
                color={color}
              />,
          }}
        />

      </Tabs.Navigator>
    </NavigationContainer>
  );
}

export default App;
