import { ReduxProvider } from '../components/ReduxProvider';
import { StyleSheet } from 'react-native';

import { PokemonProvider } from '../components/PokemonProvider';
import { Stack } from 'expo-router';
import { fireBaseInit } from '../firebase/firebaseInit';
import { db } from '../firebase/firebaseInit';
import { useEffect, useState } from 'react';
import { User, getAuth, onAuthStateChanged } from 'firebase/auth';
export default function RootLayout() {
	return <RootLayoutNav />;
}

function RootLayoutNav() {
	// Initialize Firebase
	fireBaseInit;
	db;
	const [user, setUser] = useState<User | null>(null);
	useEffect(() => {
		const auth = getAuth();
		const user = auth.currentUser;
		onAuthStateChanged(auth, user => {
			console.log('user', user);
			setUser(user);
		});
	}, []);
	return (
		<ReduxProvider>
			<PokemonProvider>
				<Stack>
					{user ? ( // Si l'utilisateur est connecté
						<Stack.Screen
							name="index"
							options={{
								headerShown: false
							}}
						/>
					) : (
						// Si l'utilisateur n'est pas connecté
						<Stack.Screen
							name="(auth)/login"
							options={{
								headerShown: false
							}}
						/>
					)}
				</Stack>
			</PokemonProvider>
		</ReduxProvider>
	);
}
