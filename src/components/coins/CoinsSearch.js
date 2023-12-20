import React, { Component } from 'react';
import { View, TextInput, Platform, StyleSheet } from 'react-native';
import Colors from 'cryptoTracker/src/resources/colors'

class CoinsSearch extends Component {

    state = {
        query: ''
    }

    handleInput = (query) => {
        this.setState({ query });

        if (this.props.onChange) {
            this.props.onChange(query);
        }
    }

    render() {

        const { query } = this.state;

        return (

            <View>
                <TextInput
                    style={[styles.textInput,
                    Platform.OS == 'android' ?
                        styles.textInputAndroid :
                        styles.textInputIos
                    ]}
                    onChangeText={this.handleInput}
                    value={query}
                    placeholder='Enter the coin you want to search'
                    placeholderTextColor={Colors.zircon}
                />
            </View>

        );

    }

}

const styles = StyleSheet.create({
    textInput: {
        backgroundColor: Colors.charade,
        paddingHorizontal: 16,
        marginStart: 16,
        color: Colors.zircon
    },
    textInputAndroid: {
        borderBottomColor: Colors.zircon,
        borderBottomWidth: 1
    },
    textInputIos: {
        margin: 8,
        borderRadius: 8
    },
    placeholder: {
        color: Colors.zircon
    }
});

export default CoinsSearch;