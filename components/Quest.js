import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Ionicons, FontAwesome, Entypo } from '@expo/vector-icons';

import Header from './Header';
import Score from './Score';
import Card from './Card';

export default class Quest extends React.Component {

  constructor(props) {
    super(props);
    this.renderCards = this.renderCards.bind(this);
    this.resetCards = this.resetCards.bind(this);
   
    let sources = {
      'fontawesome': FontAwesome,
      'entypo': Entypo,
      'ionicons': Ionicons
    };

    let cards = [
      {
        src: 'fontawesome',
        name: 'heart',
        color: 'red'
      },
      {
        src: 'ionicons',
        name: 'happy',
        color: 'yellow'
      },
      {
        src: 'fontawesome',
        name: 'puzzle-piece',
        color: '#f7911f'
      },
      {
        src: 'entypo',
        name: 'flower',
        color: '#37b24d'
      },
      {
        src: 'fontawesome',
        name: 'star',
        color: '#ffd43b'
      },
      {
        src: 'fontawesome',
        name: 'futbol-o',
        color: '#000000'
      },
      {
        src: 'fontawesome',
        name: 'asl-interpreting',
        color: '#ffffff'
      },
      {
        src: 'fontawesome',
        name: 'dribbble',
        color: 'orange'
      },
      {
        src: 'entypo',
        name: 'baidu',
        color: '#7d4b12'
      },
      {
        src: 'entypo',
        name: 'emoji-flirt',
        color: '#1c7cd6'
      },
      {
        src: 'ionicons',
        name: 'ice-cream',
        color: '#00db75'
      },
      {
        src: 'fontawesome',
        name: 'tree',
        color: '#137534'
      }
    ];

    let clone = JSON.parse(JSON.stringify(cards));

    this.cards = cards.concat(clone);
    this.cards.map((obj) => {
      let id = Math.random().toString(36).substring(7);
      obj.id = id;
      obj.src = sources[obj.src];
      obj.is_open = false;
    });

    //this.cards = this.cards.shuffle(); 
    this.cards = this.shuffle(this.cards);

    this.state = {
      current_selection: [],
      selected_pairs: [],
      score: 0,
      cards: this.cards,
      clicked: 0
    }
  
  }

  render() {
    return (
      <View style={styles.container}>
        <Header />
        <View style={styles.body}>
          { 
            this.renderRows.call(this) 
          }
        </View>
        <Score score={this.state.score} clicked={this.state.clicked} />
        <Button
          onPress={this.resetCards}
          title="De nuevo"
          color="#137534" 
        />
      </View>
    );
  }
  

  resetCards() {
    let cards = this.cards.map((obj) => {
      obj.is_open = false;
      return obj;
    });

    //cards = cards.shuffle();
    cards = this.shuffle(cards);

    this.setState({
      current_selection: [],
      selected_pairs: [],
      cards: cards,
      score: 0,
      clicked: 0
    });
  }


  renderRows() {
   
    let contents = this.getRowContents(this.state.cards);
    return contents.map((cards, index) => {
      return (
        <View key={index} style={styles.row}>
          { this.renderCards(cards) }
        </View>
      );
    });
   
  }


  renderCards(cards) {
    return cards.map((card, index) => {
      return (
        <Card 
          key={index} 
          src={card.src} 
          name={card.name} 
          color={card.color} 
          is_open={card.is_open}
          clickCard={this.clickCard.bind(this, card.id)} 
        />
      );
    });
  }


  clickCard(id) {
    let selected_pairs = this.state.selected_pairs;
    let current_selection = this.state.current_selection;
    let score = this.state.score;
    let clicked = this.state.clicked + 1;

    let index = this.state.cards.findIndex((card) => {
      return card.id == id;
    });

    let cards = this.state.cards;
    
    if(cards[index].is_open == false && selected_pairs.indexOf(cards[index].name) === -1){

      cards[index].is_open = true;
      
      current_selection.push({ 
        index: index,
        name: cards[index].name
      });

      if(current_selection.length == 2){
        if(current_selection[0].name == current_selection[1].name){
          score += 1;
          selected_pairs.push(cards[index].name);
        }else{
         
          cards[current_selection[0].index].is_open = false;

          setTimeout(() => {
            cards[index].is_open = false;
            this.setState({
              cards: cards
            });
          }, 500);
        }

        current_selection = [];
      }

      this.setState({
        score: score,
        cards: cards,
        current_selection: current_selection,
        clicked: clicked
      });

    }
  
  }

   shuffle(array) {
    var currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

  getRowContents(cards) {
    let contents_r = [];
    let contents = [];
    let count = 0;
    cards.forEach((item) => {
      count += 1;
      contents.push(item);
      if(count == 4){
        contents_r.push(contents)
        count = 0;
        contents = [];
      }
    });

    return contents_r;
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#004e15'
  },
  row: {
    flex: 1,
    flexDirection: 'row'
  },
  body: {
    flex: 18,
    justifyContent: 'space-between',
    padding: 10,
    marginTop: 20
  }
});
