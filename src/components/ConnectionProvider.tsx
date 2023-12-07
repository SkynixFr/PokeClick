import React, { useState, useEffect } from 'react';
import { Text, View, Image, ImageBackground } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';

import { StyleSheet } from 'react-native';
const ConnectionProvider = (props: React.PropsWithChildren) => {
	const netInfo = useNetInfo();
	const [isConnected, setIsConnected] = useState(true);

	useEffect(() => {
		const handleConnectivityChange = () => {
			if (netInfo.isConnected && netInfo.isInternetReachable) {
				setIsConnected(true);
			} else {
				setIsConnected(false);
			}
		};

		const unsubscribe = () => {
			// no need to unsubscribe from anything as useNetInfo handles it internally
		};

		handleConnectivityChange(); // check the initial connectivity status

		return unsubscribe;
	}, [netInfo]);

	if (!isConnected) {
		// Display a loading screen or message until the connection is restored
		return (
			<View style={NoConnection.noInternetContainer}>
				<ImageBackground
					source={require('../../assets/pikachu.gif')}
					style={NoConnection.image}
					resizeMode="contain"
				/>
				<Text style={NoConnection.noInternetText}>
					Attente d'une connexion ...{' '}
				</Text>
			</View>
		);
	}

	return props.children;
};
export const NoConnection = StyleSheet.create({
	noInternetContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	image: {
		width: 250, // Adjust the width of the image as needed
		height: 250, // Adjust the height of the image as needed
		marginBottom: 20 // Margin to separate image and text
	},
	noInternetText: {
		fontSize: 18,
		fontWeight: 'bold',
		textAlign: 'center' // Center the text
	}
});
export default ConnectionProvider;
