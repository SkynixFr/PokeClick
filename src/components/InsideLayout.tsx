import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Index from '../app/index';
import { PokemonProvider } from './PokemonProvider';
import { SuccessProvider } from './SuccessProvider';
import UnmountProvider from './UnmountProvider';
const InsideStack = createNativeStackNavigator();
export function InsideLayout() {
	return (
		<PokemonProvider>
			<SuccessProvider>
				<UnmountProvider>
					<InsideStack.Navigator>
						<InsideStack.Screen
							name="index"
							component={Index}
							options={{ headerShown: false }}
						/>
					</InsideStack.Navigator>
				</UnmountProvider>
			</SuccessProvider>
		</PokemonProvider>
	);
}
