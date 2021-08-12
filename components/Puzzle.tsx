import React from 'react';
import { RefreshControl, ScrollView, SafeAreaView, TouchableOpacity, Text, ActivityIndicator, StyleSheet, View, Button, Image } from 'react-native';
import { PicturePuzzle, PuzzlePieces } from 'react-native-picture-puzzle';
import UpdateApp from './UpdateApp';

import Header from './Header';
import ShareApp from './ShareApp';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

function shuffle(array) {
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
}

function getRandomImage(imgAr, path) {
    path = path || 'https://raw.githubusercontent.com/ravendano014/iusito/main/'; // default path here
    var num = Math.floor( Math.random() * imgAr.length );
    var img = imgAr[ num ];
    var imgStr = '' + path + img ;
    return imgStr;
}

function getRandomText(textAr) {
    var num = Math.floor( Math.random() * textAr.length );
    var txtStr = textAr[ num ];
    return txtStr;
}


var img = new Array(5);
img[0]='i1.jpg';
img[1]='i2.jpg';
img[2]='i3.jpg';
img[3]='i4.jpg';
img[4]='i5.jpg';

var txt = new Array(6);
txt[0]='1. Ayuda Mútua: Cuando dos o más personas cooperan y se socorren entre sí, para lograr las metas individuales o colectivas.';
txt[1]='2. Gestión Democrática: Las cooperativas son organizaciones democráticas controladas por sus miembros, quienes participan activamente en la toma de decisiones';
txt[2]='3. Democracia: L@s asociad@s tienen el control de la cooperativa, participando en la toma de decisiones colectivas';
txt[3]='4. Igualdad: Ofrece el mismo trato, condiciones de desarrollo, derechos y deberes con cada uno de l@s asociad@s';
txt[4]='5. Equidad: Dar a cada asociad@ en función de sus capacidades y condiciones';
txt[4]='6. Solidaridad: Juntos en la unidad y ayuda mútua los asociad@s buscan mejorar la calidad de vida de cada uno';

var puzzleimage = getRandomImage(img,'https://raw.githubusercontent.com/ravendano014/iusito/main/');

export default function Puzzle() {
const [refreshing, setRefreshing] = React.useState(false);

const onRefresh = React.useCallback(() => {
      puzzleimage = getRandomImage(img,'https://raw.githubusercontent.com/ravendano014/iusito/main/');
      //alert(puzzleimage);
      setRefreshing(true);
      wait(2000).then(() => setRefreshing(false));  
    }, []);

var originalPieces = React.useMemo<PuzzlePieces>(() => (
    [...Array(16)].map((_, i) => i)
  ), []);
var shuffledPieces = React.useMemo<PuzzlePieces>(() => {
    const p = [...originalPieces];
    shuffle(p);
    return p;
  }, [originalPieces]);
var [hidden, setHidden] = React.useState<number | null>(0);
var [pieces, setPieces] = React.useState<PuzzlePieces>(shuffledPieces);
var source = React.useMemo(() => ({
    uri: puzzleimage,
  }), []);
var renderLoading = React.useCallback((): JSX.Element => (
    <View style={[StyleSheet.absoluteFill, styles.center]}>
      <ActivityIndicator />
    </View>
  ), []);
var onChange = React.useCallback((nextPieces: PuzzlePieces, nextHidden: number | null): void => {
    setPieces([...nextPieces]);
    setHidden(nextHidden);
  }, [setPieces, setHidden]);
var solve = React.useCallback(() => {
    setPieces(originalPieces);
    setHidden(null);
  }, [setPieces, originalPieces]);
var retry = React.useCallback(() => {
    setPieces(shuffledPieces);
    setHidden(0);
  }, [setPieces, shuffledPieces]);
  return (
    <SafeAreaView>  
    <ScrollView
    contentContainerStyle={styles.scrollView}
    refreshControl={
      <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
      />}>
    <View style={[styles.container, styles.center]}>
        <Header />
        <Image
        style={styles.tinyLogo}
        source={require('../assets/logo.png')}
        />
        <Text style={{color: 'black', fontSize: 17, fontWeight: 'bold', paddingTop: 5, marginBottom: 40, backgroundColor: '#ffe800'}}>
            Comité de Educación
        </Text>
        <View style={styles.row}>
          <TouchableOpacity onPress={retry}>
            <Text style={{color: 'yellow', marginRight: 10, fontSize: 17, fontWeight: 'bold'}}>
              Reintentar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={solve}>
            <Text style={{color: 'yellow', marginLeft: 40, fontSize: 17, fontWeight: 'bold'}}>
              Resolver
            </Text>
          </TouchableOpacity>
        </View>

      <PicturePuzzle
        style={styles.shadow}
        renderLoading={renderLoading}
        pieces={pieces}
        hidden={hidden}
        onChange={onChange}
        size={290}
        source={source}
      />
      <View>

        <View style={styles.row}>
          <Text style={{color: 'white', marginRight: 35, marginLeft: 35}}>
            www.cactiusa.com.sv
          </Text>

        </View>

          <View >
            <Text></Text>
            <Text style={{color: 'yellow', fontSize: 17, marginRight: 35, marginLeft: 35}}>{getRandomText(txt)}</Text>
            <Text></Text>
            <ShareApp />
          <Text></Text>
          </View>
          <Text></Text>
          <UpdateApp />
          <Text></Text>
      </View>
    </View>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    center: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    container: {
      flex: 1,
      backgroundColor: '#004e15',
    },
    row: { flexDirection: 'row', justifyContent: 'flex-end'},
    shadow: {
      shadowColor: "#000",
      shadowOffset: {
        width: 2,
        height: 2,
      },
      shadowOpacity: 0.9,
      shadowRadius: 10.0,
    },
    tinyLogo: {
      width: 100,
      height: 100,
    },
    scrollView: {
      flex: 1,
      backgroundColor: '#004e15',
    },
  });