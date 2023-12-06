import { StyleSheet } from 'react-native';
export const NoConnection = StyleSheet.create({
	noInternetContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#0000' // White background color
	},
	image: {
		width: 150, // Adjust the width of the image as needed
		height: 150, // Adjust the height of the image as needed
		marginBottom: 20 // Margin to separate image and text
	},
	noInternetText: {
		fontSize: 18,
		fontWeight: 'bold',
		textAlign: 'center' // Center the text
	}
});
