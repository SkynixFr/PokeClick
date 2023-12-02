import { View } from 'react-native';
import React from 'react';

import Game from '../components/Game';
import { Button } from '@rneui/themed';
import HomeStyle from '../styles/home';
import BottomNavBar from '../components/BottomNavBar';
import { NavigationProp } from '@react-navigation/native';
interface RouterProps {
	navigation: NavigationProp<any, any>;
}

const Home = ({ navigation }: RouterProps) => {
	return (
		<View style={HomeStyle.container}>
			<Game />
			<BottomNavBar />
			<Button
				title="Go to Details"
				onPress={() => navigation.navigate('about', { screen: 'about' })}
			/>
		</View>
	);
};

export default Home;
