import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Index from '../app/index';
import { PokemonProvider } from './PokemonProvider';
const InsideStack = createNativeStackNavigator();
export function InsideLayout() {
	return (
		<PokemonProvider>
			<InsideStack.Navigator>
				<InsideStack.Screen
					name="index"
					component={Index}
					options={{ headerShown: false }}
				/>
			</InsideStack.Navigator>
		</PokemonProvider>
	);
}
