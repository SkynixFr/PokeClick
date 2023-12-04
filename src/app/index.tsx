import { View } from 'react-native';
import React from 'react';

import Game from '../components/Game';
import BottomNavBar from '../components/BottomNavBar';

import HomeStyle from '../styles/home';

const Home = () => {
	return (
		<View style={HomeStyle.container}>
			<Game />
			<BottomNavBar />
		</View>
	);
};

export default Home;
