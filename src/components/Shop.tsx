import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';

const Shop = () => {
	return (
		<View style={styles.container}>
			<Image
				source={require('../../assets/snorlax_sleeping.png')}
				style={{
					width: 300,
					height: 400,
					position: 'absolute'
				}}
			/>
			<Text style={styles.text}>Coming soon...</Text>
		</View>
	);
};

export default Shop;

const styles = StyleSheet.create({
	container: {
		position: 'relative',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	text: {
		marginTop: 175,
		fontSize: 20,
		fontWeight: 'bold',
		zIndex: 1
	}
});
