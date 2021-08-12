import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Board from './Board'

export default class Game extends Component {
  constructor() {
    super();
    this.state = {
      squares: Array(9).fill(null),
      endGame: false,
      xIsNext: true
    };
  }

  handleClick(i) {
    const squares = this.state.squares
    if (this.state.endGame || squares[i] != null) return;

    if (squares[i] || this.calculateWinner()) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext
    });
  }

  reset() {
    this.setState({
      squares: Array(9).fill(null),
      endGame: false,
      xIsNext: true
    });
  }

  calculateWinner() {
    const squares = this.state.squares;
    for (let i = 0; i < winLines.length; i++) {
      const [a, b, c] = winLines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  render() {
    const winner = this.calculateWinner();

    let status;
    let player;
   
    if (winner) {
      status = "Ganador: ";
      player = winner
    } else {
      status = "Turno de : ";
      player = this.state.xIsNext ? "X" : "O"
    }

    return (
      <View style={styles.game}>
        <Text style={styles.title}>X / 0</Text>
        <Text>
          <Text style={styles.status}>{status}</Text>
          <Text style={styles.textPlayer}>{player}</Text>
       </Text>
        <Board 
          squares={this.state.squares}
          winLine={this.state.winLine}
          onClick={i => this.handleClick(i)}
        />
        <TouchableOpacity
          onPress={() => this.reset()}
        >
          <Text style={styles.resetButton}>DE NUEVO</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 20,
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    color: "#ffe800"
  },
  status: {
    fontSize: 24,
    color: "#ffe800"
  },
  textPlayer:  {
    fontWeight: "bold",
    fontSize: 24,
    color: "#ffe800"
  },
  resetButton: {
    textAlign: "center",
    fontSize: 17,
    marginTop: 20,
    color: "#ffffff",
    backgroundColor: "#137534" 
  }
});

const winLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];