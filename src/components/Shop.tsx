import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';

const Shop = () => {
	return (
		<View>
			<Image source={require('../../assets/snorlax_sleeping.jpeg')} style={{ width: 300, height: 400 }} />
			<Text>Coming soon...</Text>
		</View>
	);
};

export default Shop;

const styles = StyleSheet.create({});
