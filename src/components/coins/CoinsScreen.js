import React, { Component } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import Http from 'cryptoTracker/src/libs/http'
import CoinsItem from './CoinItem';
import CoinsSearch from './CoinsSearch';
import Colors from 'cryptoTracker/src/resources/colors';

class CoinsScreen extends Component {

    state = {
        coins: [],
        allCoins: []
    }

    componentDidMount = async () => {
        this.getCoins();
    }

    getCoins = async () => {
        const res = await Http.instance.get('https://api.coinlore.net/api/tickers/');

        this.setState({ coins: res.data, allCoins: res.data });
    }

    goToDetails = (currency) => {
        this.props.navigation.navigate('Coin Details', { currency });
    }

    handleSeach = (query) => {

        const { allCoins } = this.state;

        const coinsFiltered = allCoins.filter((coin) => {
            return coin.name.toLowerCase().includes(query.toLowerCase()) ||
                coin.symbol.toLowerCase().includes(query.toLowerCase());
        });

        this.setState({ coins: coinsFiltered });

    }

    render() {

        const { coins } = this.state;

        return (
            <View style={styles.container}>
                <CoinsSearch onChange={this.handleSeach} />
                <FlatList
                    data={coins}
                    renderItem={({ item }) =>
                        <CoinsItem item={item} onPress={() => this.goToDetails(item)} />
                    }
                />
            </View>
        );
    };


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.charade
    }
});

export default CoinsScreen;