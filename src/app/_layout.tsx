import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ReduxProvider } from '../components/ReduxProvider';
import { PokemonProvider } from '../components/PokemonProvider';
import { db, fireBaseInit } from '../firebase/firebaseInit';
import { AuthProvider } from '../components/AuthProvider';

const Stack = createNativeStackNavigator();
export default function RootLayout() {
	return <RootLayoutNav />;
}

function RootLayoutNav() {
	// Initialize Firebase
	fireBaseInit;
	db;
	return (
		<ReduxProvider>
			<PokemonProvider>
				<NavigationContainer independent={true}>
					<AuthProvider></AuthProvider>
				</NavigationContainer>
			</PokemonProvider>
		</ReduxProvider>
	);
}
