// import { ReduxProvider } from '../components/ReduxProvider';
// import { StyleSheet } from 'react-native';

// import { PokemonProvider } from '../components/PokemonProvider';
// import { Stack } from 'expo-router';
// import { fireBaseInit } from '../firebase/firebaseInit';
// import { db } from '../firebase/firebaseInit';
// import { useEffect, useState } from 'react';
// import { User, getAuth, onAuthStateChanged } from 'firebase/auth';
// export default function RootLayout() {
// 	return <RootLayoutNav />;
// }

// function RootLayoutNav() {
// 	// Initialize Firebase
// 	fireBaseInit;
// 	db;
// 	const [user, setUser] = useState<User | null>(null);
// 	useEffect(() => {
// 		const auth = getAuth();
// 		onAuthStateChanged(auth, user => {
// 			setUser(user);
// 		});
// 	}, []);
// 	return (
// 		<ReduxProvider>
// 			<PokemonProvider>
// 				<Stack>
// 					{user ? ( // Si l'utilisateur est connecté
// 						<Stack.Screen
// 							name="index"
// 							options={{
// 								headerShown: false
// 							}}
// 						/>
// 					) : (
// 						// Si l'utilisateur n'est pas connecté
// 						<Stack.Screen
// 							name="(auth)/login"
// 							options={{
// 								headerShown: false
// 							}}
// 						/>
// 					)}
// 				</Stack>
// 			</PokemonProvider>
// 		</ReduxProvider>
// 	);
// }

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ReduxProvider } from '../components/ReduxProvider';
import Index from './index';
import { PokemonProvider } from '../components/PokemonProvider';
import Login from './(auth)/login';
import Register from './(auth)/register';
import { useEffect, useState } from 'react';
import { User, getAuth, onAuthStateChanged } from 'firebase/auth';
import { db, fireBaseInit } from '../firebase/firebaseInit';

const Stack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();
export default function RootLayout() {
	return <RootLayoutNav />;
}

function InsideLayout() {
	return (
		<InsideStack.Navigator>
			<InsideStack.Screen
				name="index"
				component={Index}
				options={{ headerShown: false }}
			/>
		</InsideStack.Navigator>
	);
}

function RootLayoutNav() {
	// Initialize Firebase
	fireBaseInit;
	db;
	const [user, setUser] = useState<User | null>(null);
	useEffect(() => {
		const auth = getAuth();
		onAuthStateChanged(auth, user => {
			setUser(user);
		});
	}, []);

	return (
		<ReduxProvider>
			<PokemonProvider>
				<NavigationContainer independent={true}>
					<Stack.Navigator>
						{user ? (
							// Si l'utilisateur est connecté
							<Stack.Screen
								name="Login"
								component={InsideLayout}
								options={{
									headerShown: false
								}}
							/>
						) : (
							// Si l'utilisateur n'est pas connecté
							<Stack.Screen
								name="Login"
								component={Login}
								options={{
									headerShown: false
								}}
							/>
						)}
						<Stack.Screen
							name="register"
							component={Register}
							options={{ headerShown: false }}
						/>
					</Stack.Navigator>
				</NavigationContainer>
			</PokemonProvider>
		</ReduxProvider>
	);
}
