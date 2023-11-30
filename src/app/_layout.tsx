import { ReduxProvider } from '../components/ReduxProvider';
import { View, StyleSheet, Dimensions } from 'react-native';

import BottomNavBar from '../components/BottomNavBar';
import Home from './index';

export default function RootLayout() {
	return <RootLayoutNav />;
}

function RootLayoutNav() {
	return (
		<ReduxProvider>
			<View style={styles.container}>
				<Home />
				<BottomNavBar />
			</View>
		</ReduxProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: '100%',
		backgroundColor: 'lightblue'
	}
});
