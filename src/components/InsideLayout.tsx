import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Index from '../app/index';
import { PokemonProvider } from './PokemonProvider';
import { SuccessProvider } from './SuccessProvider';
const InsideStack = createNativeStackNavigator();
export function InsideLayout() {
	return (
		<PokemonProvider>
			<SuccessProvider>
				<InsideStack.Navigator>
					<InsideStack.Screen
						name="index"
						component={Index}
						options={{ headerShown: false }}
					/>
				</InsideStack.Navigator>
			</SuccessProvider>
		</PokemonProvider>
	);
}
