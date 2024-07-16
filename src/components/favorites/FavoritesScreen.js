import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList } from 'react-native';
import FavoriteEmpty from "./FavoriteEmpty";
import Colors from '../../resources/colors';
import Storage from '../../libs/storage';
import CoinItem from '../coins/CoinItem';

class FavoritesScreen extends Component {

    state = {
        favorites: []
    }

    goToDetails = (currency) => {
        this.props.navigation.navigate('Favorite Details', { currency });
    }

    getFavorites = async () => {

        try {

            const allKeys = await Storage.instance.getKeys();

            const keys = allKeys.filter((key) => key.includes('favorite-'));

            const favs = await Storage.instance.getAllItems(keys);

            const favorites = favs.map((fav) => JSON.parse(fav[1]));

            this.setState({ favorites });

            console.log('favorites', favorites);

        } catch (e) {
            console.log('Get Favorites error', e);
        }


    }

    componentDidMount() {
        this.getFavorites();

        this.props.navigation.addListener('focus', this.getFavorites);
    };

    componentWillUnmount() {
        this.props.navigation.removeListener('focus', this.getFavorites);
    }

    render() {

        const { favorites } = this.state;

        return (

            favorites.length == 0 ?
                <View style={styles.cointainer}>
                    <FavoriteEmpty />
                </View> :
                <View style={styles.cointainer}>
                    <FlatList
                        data={favorites}
                        renderItem={({ item }) =>
                            <CoinItem
                                item={item}
                                onPress={() => this.goToDetails(item)}
                            />
                        }
                    />
                </View>

        );

    }

}

const styles = StyleSheet.create({
    cointainer: {
        flex: 1,
        backgroundColor: Colors.charade,
    }
});

export default FavoritesScreen;