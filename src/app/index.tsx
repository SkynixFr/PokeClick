import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import BottomNavBar from '../components/bottomNavBar';

const Home = () => {
	return (
		<View style={styles.container}>
			<Text>Home</Text>
			<BottomNavBar />
		</View>
	);
};

export default Home;

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: '100%',
		backgroundColor: 'lightgrey'
	}
});
