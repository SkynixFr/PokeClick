import { User, getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { InsideLayout } from './InsideLayout';
import Login from '../app/(auth)/login';
import Register from '../app/(auth)/register';
export const AuthProvider = (props: React.PropsWithChildren) => {
	const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);
	const [user, setUser] = React.useState<User | null>(null);
	const Stack = createNativeStackNavigator();
	useEffect(() => {
		// Vérifier si l'utilisateur est connecté ici
		// Si oui, setIsAuthenticated(true)
		// Si non, setIsAuthenticated(false)
		//La vérification se fait de manière automatique avec la fonction onAuthStateChanged
		const auth = getAuth();
		onAuthStateChanged(auth, user => {
			setUser(user);
		});
	}, []);
	return (
		//Je vérifie si l'utilisateur est connecté ou non
		//Si oui, je l'envoie sur la page d'accueil
		//Si non, je l'envoie sur la page de connexion
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
				<>
					{/*Si l'utilisateur n'est pas connecté */}
					<Stack.Screen
						name="login"
						component={Login}
						options={{
							headerShown: false
						}}
					/>
					<Stack.Screen
						name="register"
						component={Register}
						options={{ headerShown: false }}
					/>
				</>
			)}
		</Stack.Navigator>
	);
};
