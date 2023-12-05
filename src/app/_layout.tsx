import { NavigationContainer } from '@react-navigation/native';
import { ReduxProvider } from '../components/ReduxProvider';


import { db, fireBaseInit } from '../firebase/firebaseInit';
import { AuthProvider } from '../components/AuthProvider';

import { PokemonProvider } from '../components/PokemonProvider';
import { Stack } from 'expo-router';
import { SuccessProvider } from '../components/SuccessProvider';

export default function RootLayout() {
	return <RootLayoutNav />;
}

function RootLayoutNav() {
	// Initialize Firebase
	fireBaseInit;
	db;
	return (
		<ReduxProvider>
			<NavigationContainer independent={true}>
				<AuthProvider></AuthProvider>
			</NavigationContainer>
		</ReduxProvider>
	);
}
