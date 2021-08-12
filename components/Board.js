import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Square from './Square'

export default class Board extends Component {
  renderSquare(i, size) {
    const isInWinLine = !this.props.winLine ? false : this.props.winLine.indexOf(i) != -1;
    return (
      <Square key={Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)}
        value={this.props.squares[i]} 
        size={size}
        isInWinLine={isInWinLine}
        onClick={() => this.props.onClick(i)}
      />
    );
  } 
  
  render() {
    const width = Dimensions.get('window').width;
    const bSize = 0.7*width;
    
    const boardArr = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8]
    ];

    return (
      <View style={[styles.board, {width: bSize, height: bSize}]} >
        {boardArr.map(row =>
          <View style={styles.row} key={Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)} >
            {row.map(square =>
              this.renderSquare(square, (bSize-2)/3)
            )}
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row'
  },

  board: {
    backgroundColor: "#ffe800",
    width: 120,
    height: 120,
    borderWidth: 1,
    borderColor: "#004e15",
  }
});