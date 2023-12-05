import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { InsideLayout } from './InsideLayout';
import Login from '../app/(auth)/login';
import Register from '../app/(auth)/register';
import { User, getAuth, onAuthStateChanged } from 'firebase/auth';

export const AuthProvider = (props: React.PropsWithChildren) => {
	const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);
	const [user, setUser] = React.useState<User | null>(null);
	const Stack = createNativeStackNavigator();

	useEffect(() => {
		const auth = getAuth();
		// Listen for changes in authentication state
		const unsubscribe = onAuthStateChanged(auth, user => {
			if (user) {
				// Store user data in AsyncStorage

				setUser(user);
				setIsAuthenticated(true);
			} else {
				setUser(null);
				setIsAuthenticated(false);
			}
		});

		// Clean up subscription on component unmount
		return () => unsubscribe();
	}, []);

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
