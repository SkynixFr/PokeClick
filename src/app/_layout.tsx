import { NavigationContainer } from '@react-navigation/native';
import { ReduxProvider } from '../components/ReduxProvider';

import { db, fireBaseInit } from '../firebase/firebaseInit';
import { AuthProvider } from '../components/AuthProvider';

import { LogBox } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import ConnectionProvider from '../components/ConnectionProvider';

export default function RootLayout() {
	return <RootLayoutNav />;
}

function RootLayoutNav() {
	//Ingore all log notifications
	LogBox.ignoreAllLogs(); //Ignore all log notifications
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
