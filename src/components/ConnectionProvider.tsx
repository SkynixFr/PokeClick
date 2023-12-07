import React, { useState, useEffect } from 'react';
import {
	Text,
	View,
	Image,
	ImageBackground,
	ActivityIndicator
} from 'react-native';
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
		return (
			<View style={NoConnection.noInternetContainer}>
				<View style={NoConnection.overlay}>
					<ImageBackground
						source={require('../../assets/pikachu.gif')}
						style={NoConnection.image}
						resizeMode="contain"
					/>
					<Text style={NoConnection.noInternetText}>
						Attente d'une connexion ...
					</Text>
					<ActivityIndicator size="large" color="#00ff00" />
				</View>
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
	overlay: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 20 // Ajustez cette valeur pour définir l'espacement souhaité
	},
	image: {
		width: 250,
		height: 250,
		marginBottom: 10 // Ajustez cette valeur pour définir l'espacement souhaité
	},
	noInternetText: {
		fontSize: 18,
		fontWeight: 'bold',
		textAlign: 'center',
		marginTop: 10 // Ajustez cette valeur pour définir l'espacement souhaité
	}
});

export default ConnectionProvider;
