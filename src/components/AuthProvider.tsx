import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { InsideLayout } from './InsideLayout';
import Login from '../app/(auth)/login';
import Register from '../app/(auth)/register';
import { User, getAuth, onAuthStateChanged } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthProvider = (props: React.PropsWithChildren) => {
	const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);
	const [user, setUser] = React.useState<User | null>(null);
	const Stack = createNativeStackNavigator();

	useEffect(() => {
		const auth = getAuth();

		// Check AsyncStorage for stored user data
		const checkAsyncStorage = async () => {
			try {
				const storedUser = await AsyncStorage.getItem('user');
				if (storedUser) {
					setUser(JSON.parse(storedUser));
					setIsAuthenticated(true);
				}
			} catch (error) {
				console.error('Error reading AsyncStorage:', error);
			}
		};

		checkAsyncStorage();

		// Check if the user is authenticated using onAuthStateChanged
		onAuthStateChanged(auth, user => {
			if (user) {
				// Store user data in AsyncStorage
				AsyncStorage.setItem('user', JSON.stringify(user));
				setUser(user);
				setIsAuthenticated(true);
			}
		});
	}, []);
	console.log(user?.uid);
	return (
		<Stack.Navigator>
			{isAuthenticated ? (
				<Stack.Screen
					name="InsideLayout"
					component={InsideLayout}
					options={{ headerShown: false }}
				/>
			) : (
				<>
					<Stack.Screen
						name="Login"
						component={Login}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="Register"
						component={Register}
						options={{ headerShown: false }}
					/>
				</>
			)}
		</Stack.Navigator>
	);
};
