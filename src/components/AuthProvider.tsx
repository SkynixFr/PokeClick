import React, { useEffect } from 'react';
import { store } from '../app/store';
import { Provider } from 'react-redux';
import { View } from 'react-native';
import Login from '../app/(auth)/login';
import { getAuth } from 'firebase/auth';
import { router } from 'expo-router';
export const AuthProvider = (props: React.PropsWithChildren) => {
	const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);

	useEffect(() => {
		const auth = getAuth();
		const user = auth.currentUser;
		// Vérifier si l'utilisateur est connecté ici
		// Si oui, setIsAuthenticated(true)
		// Si non, setIsAuthenticated(false)
		//La vérification se fait de manière automatique avec la fonction onAuthStateChanged
		const unsubscribe = auth.onAuthStateChanged(user => {
			if (user) {
				setIsAuthenticated(true);
			} else {
				setIsAuthenticated(false);
			}
		});
		return () => unsubscribe();
	}, []);

	if (!isAuthenticated) router.replace('login');

	return isAuthenticated ? props.children : <Login />;
};
