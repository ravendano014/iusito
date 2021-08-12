import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Score extends React.Component {
	
	render() {
		return (
			<View style={styles.score_container}>
				<Text style={styles.score}>Parejas: {this.props.score}      Intentos: {this.props.clicked}</Text>
			</View>
		);
	}

}


const styles = StyleSheet.create({
	score_container: {
		flex: 1,
		alignItems: 'center',
		padding: 20
	},
	score: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#ffe800'
	}
});