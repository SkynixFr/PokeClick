import { StyleSheet } from 'react-native';
const UpgradeStyle = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		padding: 0.5,
		borderBottomWidth: 1,
		borderBottomColor: '#000',
		// Add the following to make it take up more width
		width: '90%', // Adjust the percentage as needed
		marginBottom: 70
	}
});

export default UpgradeStyle;
