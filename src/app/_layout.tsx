import { NavigationContainer } from '@react-navigation/native';
import { ReduxProvider } from '../components/ReduxProvider';

import { db, fireBaseInit } from '../firebase/firebaseInit';
import { AuthProvider } from '../components/AuthProvider';

import { PaperProvider } from 'react-native-paper';

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
					<AuthProvider></AuthProvider>
				</NavigationContainer>
			</PaperProvider>
		</ReduxProvider>
	);
}
