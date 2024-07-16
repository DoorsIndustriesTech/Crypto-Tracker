import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, SectionList, FlatList, Pressable, Alert } from 'react-native';
import Colors from '../../resources/colors';
import Http from '../../libs/http';
import CoinMarketsItem from './CoinMarketsItem';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import Storage from '../../libs/storage';

class CoinDetailsScreen extends Component {

    state = {
        currency: {},
        markets: [],
        isFavorite: false
    };

    getCurrencyIcon = (currencyName) => {

        if (currencyName) {
            const symbol = currencyName.toLowerCase().replace(' ', '-');
            return `https://www.coinlore.com/img/50x50/${symbol}.png`;
        }

    };

    getSections = (currency) => {

        const sections = [
            {
                title: "Market Cap",
                data: [currency.market_cap_usd]
            },
            {
                title: "Volume 24H",
                data: [currency.volume24]
            },
            {
                title: "Change 24",
                data: [currency.percent_change_24h]
            }
        ]

        return sections;

    }

    getMarkets = async (currencyId) => {

        const url = `https://api.coinlore.net/api/coin/markets/?id=${currencyId}`;
        const markets = await Http.instance.get(url);

        this.setState({ markets });

    }

    toggleHandle = () => {

        if (this.state.isFavorite) {
            this.removeFavorite();
        } else {
            this.addFavorite();
        }

    }

    getFavorite = async () => {

        try {
            const key = `favorite-${this.state.currency.id}`;
            const favStr = await Storage.instance.getFavItem(key);

            if (favStr != null) {
                this.setState({ isFavorite: true });
            }

        } catch (e) {
            console.log('get error', e);
        }


    }

    removeFavorite = () => {

        Alert.alert('Remove Favorite', `Are you sure want to delete ${this.state.currency.name} from favorites`, [
            {
                text: 'Cancel',
                onPress: () => { },
                style: 'cancel'
            },
            {
                text: 'Remove',
                onPress: async () => {
                    const key = `favorite-${this.state.currency.id}`;
            
                    await Storage.instance.removeItem(key);
            
                    this.setState({ isFavorite: false });
                },
                style: 'destructive'
            }
        ])


    }

    addFavorite = async () => {

        const coin = JSON.stringify(this.state.currency);
        const key = `favorite-${this.state.currency.id}`;

        const stored = await Storage.instance.storeItem(key, coin);

        if (stored) {
            this.setState({ isFavorite: true });
        }

        console.log('stored', stored);

    }

    componentDidMount() {
        // console.log('currency', this.props.route.params);
        const { currency } = this.props.route.params;

        // Change Screen title

        this.props.navigation.setOptions({ title: currency.symbol });

        this.getMarkets(currency.id);

        this.setState({ currency }, () => {
            this.getFavorite();
        })
    };

    render() {

        const { currency } = this.state;
        const { markets } = this.state;
        const { isFavorite } = this.state;

        const ImgUri = this.getCurrencyIcon(currency.name);

        const currencyFormat = Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        })

        return (
            <View style={styles.container}>
                <FlatList
                    style={styles.markets}
                    horizontal={true}
                    data={markets}
                    renderItem={({ item }) => <CoinMarketsItem item={item} />}
                />
                <View style={styles.row}>
                    <View style={styles.subHeader}>
                        <Image style={styles.coinIcon} source={{ uri: ImgUri }} />
                        <Text style={styles.subHeaderText}>{currency.name}</Text>
                    </View>
                    <Pressable
                        onPress={this.toggleHandle}
                    >
                        <FontAwesomeIcon
                            icon={isFavorite ? faStarSolid : faStarRegular}
                            color={!isFavorite ? Colors.zircon : Colors.picton}
                            size={30}
                        />
                    </Pressable>
                </View>

                <SectionList
                    style={styles.section}
                    sections={this.getSections(currency)}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => {
                        const chars = ('' + item).length;
                        return <View style={styles.sectionItem}>
                            <Text
                                style={chars <= 5 ? item > 0 ? styles.percentUp : item == 0 ? styles.itemText : styles.percentDown : styles.itemText}
                            >
                                {chars <= 5 ? item : currencyFormat.format(item)}
                            </Text>
                        </View>
                    }}
                    renderSectionHeader={({ section }) =>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionText}>{section.title}</Text>
                        </View>
                    }
                />
            </View>
        );

    };

}

const styles = StyleSheet.create({
    coinIcon: {
        width: 50,
        height: 50
    },
    container: {
        flex: 1,
        backgroundColor: Colors.charade,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        alignItems: 'center'
    },
    subHeader: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    subHeaderText: {
        color: Colors.white,
        fontWeight: "bold",
        fontSize: 18,
        marginStart: 16
    },
    section: {
        maxHeight: 220
    },
    sectionHeader: {
        color: Colors.white,
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        padding: 8
    },
    sectionItem: {
        padding: 8
    },
    itemText: {
        color: Colors.white,
    },
    sectionText: {
        color: Colors.white,
        fontSize: 14,
        fontWeight: "bold"
    },
    percentUp: {
        color: Colors.green
    },
    percentDown: {
        color: Colors.red
    },
    markets: {
        flexGrow: 0,
        padding: 16
    }
});

export default CoinDetailsScreen;