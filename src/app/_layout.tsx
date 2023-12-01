import { ReduxProvider } from '../components/ReduxProvider';
import { StyleSheet } from 'react-native';

import { PokemonProvider } from '../components/PokemonProvider';
import { Stack } from 'expo-router';

export default function RootLayout() {
	return <RootLayoutNav />;
}

function RootLayoutNav() {
	return (
		<ReduxProvider>
			<PokemonProvider>
				<Stack>
					<Stack.Screen
						name="index"
						options={{
							headerShown: false
						}}
					/>
					<Stack.Screen
						name="about"
						options={{
							headerShown: false
						}}
					/>
				</Stack>
			</PokemonProvider>
		</ReduxProvider>
	);
}
