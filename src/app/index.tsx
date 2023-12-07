import { View, Image } from 'react-native';
import React from 'react';

import Game from '../components/Game';
import BottomNavBar from '../components/BottomNavBar';

import HomeStyle from '../styles/home';
import { SignOutButton } from '../components/SignOutButton';

const Home = () => {
	return (
		<View style={HomeStyle.container}>
			<Image
				source={require('../../assets/bg-game2.png')}
				style={{ position: 'absolute' }}
				resizeMode="cover"
			/>
			<SignOutButton />
			<Game />
			<BottomNavBar />
		</View>
	);
};

export default Home;
