import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Index from '../app/index';
const InsideStack = createNativeStackNavigator();
export function InsideLayout() {
	return (
		<InsideStack.Navigator>
			<InsideStack.Screen
				name="index"
				component={Index}
				options={{ headerShown: false }}
			/>
		</InsideStack.Navigator>
	);
}
