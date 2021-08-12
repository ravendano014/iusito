import React, { Component } from 'react';
import { Text, View, StyleSheet} from 'react-native';

import Header from './Header';
import Game from './Game';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header />
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Game />
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#004e15'
  }
});