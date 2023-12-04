import { ReduxProvider } from '../components/ReduxProvider';

import { PokemonProvider } from '../components/PokemonProvider';
import { Stack } from 'expo-router';
import { SuccessProvider } from '../components/SuccessProvider';

export default function RootLayout() {
	return <RootLayoutNav />;
}

function RootLayoutNav() {
	return (
		<ReduxProvider>
			<PokemonProvider>
				<SuccessProvider>
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
				</SuccessProvider>
			</PokemonProvider>
		</ReduxProvider>
	);
}
