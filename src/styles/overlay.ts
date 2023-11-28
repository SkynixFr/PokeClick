import { StyleSheet, Dimensions } from 'react-native';

const BottomNavBarStyle = StyleSheet.create({
	overlay: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		height: Dimensions.get('window').height * 0.5,
		backgroundColor: 'rgba(0, 0, 0, 0.3)',
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default BottomNavBarStyle;
