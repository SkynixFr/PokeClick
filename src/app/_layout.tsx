import { NavigationContainer } from '@react-navigation/native';
import { ReduxProvider } from '../components/ReduxProvider';

import { db, fireBaseInit } from '../firebase/firebaseInit';
import { AuthProvider } from '../components/AuthProvider';


import { PaperProvider } from 'react-native-paper';

import { PokemonProvider } from '../components/PokemonProvider';
import { Stack } from 'expo-router';
import { SuccessProvider } from '../components/SuccessProvider';
import ConnectionProvider from '../components/ConnectionProvider';


export default function RootLayout() {
	return <RootLayoutNav />;
}

function RootLayoutNav() {
	// Initialize Firebase
	fireBaseInit;
	db;
	return (
		<ReduxProvider>

			<PaperProvider>
				<NavigationContainer independent={true}>
          <ConnectionProvider>
					<AuthProvider></AuthProvider>
            </ConnectionProvider>
				</NavigationContainer>
			</PaperProvider>
		</ReduxProvider>
	);
}
