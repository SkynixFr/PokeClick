import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React from 'react';
import { PokemonImgByPokemonId } from '../constants/PokemonImgByPokemonId';
import { Starter } from '../types/starter';
import { useDispatch } from 'react-redux';
import { addUpgrades, setIsStarterSelected } from '../features/upgradesSlice';
import { UpgradeDetails } from '../types/upgrade';

const StarterSelection = () => {
	const dispatch = useDispatch();

	const starters: Starter[] = [
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

	function handlerStarterSelection(starter: Starter) {
		const starterUpgrade: UpgradeDetails = {
			id: starter.id,
			name: starter.name,
			cost: 20,
			damage: 2,
			level: 1
		};
		dispatch(addUpgrades([starterUpgrade]));
		dispatch(setIsStarterSelected(true));
	}

	return (
		<View style={styles.container}>
			<Text>Choisis ton Pokémon de départ !</Text>
			<View style={styles.list}>
				{starters.map((starter: Starter) => (
					<TouchableOpacity
						key={starter.id}
						onPress={() => handlerStarterSelection(starter)}
					>
						<View>
							<Image
								source={PokemonImgByPokemonId[starter.id]}
								style={{ width: 100, height: 100 }}
							/>
							<Text>{starter.name}</Text>
						</View>
					</TouchableOpacity>
				))}
			</View>
		</View>
	);
};

export default StarterSelection;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		alignContent: 'center',
		gap: 50
	},
	list: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-around'
	}
});
