import * as React from 'react';
import { Text, Button, View, StyleSheet, StatusBar } from 'react-native';
import { Updates, Constants } from 'expo';

export default class UpdateApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showUpdate: false
    }
  }
  UNSAFE_componentDidMount() {
    Updates.checkForUpdateAsync().then(update => {
      if (update.isAvailable) {
        this.setState({showUpdate: true});
      }
    });
  }

  doUpdate = () => {
    Updates.reload();
  }

  render() {
    return <View style={styles.container}>
    { this.state.showUpdate ?
    <Text>Hay una nueva actualización, click! <Button onPress={() => this.doUpdate()} title="Actualizame"></Button></Text>
     : <Text>Actualizado</Text>}
    </View>;
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    backgroundColor: '#ffe800',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});