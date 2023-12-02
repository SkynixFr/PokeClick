import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	Image,
	FlatList
} from 'react-native';
import React from 'react';
import { PokemonImgByPokemonId } from '../constants/PokemonImgByPokemonId';

const StarterSelection = () => {
	const starters = [
		{
			id: 1,
			name: 'Bulbizarre'
		},
		{
			id: 2,
			name: 'Herbizarre'
		},
		{
			id: 3,
			name: 'Florizarre'
		}
	];

	const renderStarterItem = ({ item }: any) => (
		<TouchableOpacity>
			<View>
				<Image
					source={PokemonImgByPokemonId[item.id]}
					style={{ width: 100, height: 100 }}
				/>
				<Text>{item.name}</Text>
			</View>
		</TouchableOpacity>
	);

	return (
		<View style={styles.container}>
			<Text style={styles.headerText}>Choisis ton Pokémon de départ :</Text>
			<FlatList
				data={starters}
				renderItem={renderStarterItem}
				keyExtractor={item => item.id.toString()}
				horizontal
				contentContainerStyle={styles.flatListContainer}
			/>
		</View>
	);
};

export default StarterSelection;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-around',
		alignItems: 'center',
		alignContent: 'center',
		backgroundColor: 'blue'
	},
	headerText: {
		textAlign: 'center',
		marginBottom: 10
	},
	flatListContainer: {
		alignItems: 'center',
		backgroundColor: 'red'
	}
});
