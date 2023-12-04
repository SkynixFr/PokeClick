import { View } from 'react-native';
import React from 'react';

import Game from '../components/Game';
import BottomNavBar from '../components/BottomNavBar';

import HomeStyle from '../styles/home';
import BottomNavBar from '../components/BottomNavBar';
import { NavigationProp } from '@react-navigation/native';

const Home = () => {
	return (
		<View style={HomeStyle.container}>
			<Game />
			<BottomNavBar />
		</View>
	);
};

export default Home;
