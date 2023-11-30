import { StyleSheet } from 'react-native';

const BottomNavBarStyle = StyleSheet.create({
	bottomNavBar: {
		position: 'absolute',
		bottom: 0,
		width: '100%',
		height: 75,
		display: 'flex',
		justifyContent: 'space-around',
		alignItems: 'center',
		flexDirection: 'row',
		backgroundColor: '#fff',
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		zIndex: 10
	},
	navBtn: {
		width: '25%',
		height: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default BottomNavBarStyle;
