import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetPokemonDetailsQuery } from '../features/api/apiSlice';
import { RootState } from '../app/store';

import { PokemonDetails } from '../types/pokemon';
import { incrementLevel } from '../features/levelSlice';

type PokemonDetailsProps = {
	pokemon: PokemonDetails;
	randomPokemon: () => void;
};

const Pokemon: React.FC<PokemonDetailsProps> = ({ pokemon, randomPokemon }) => {
	const dpc = useSelector((state: RootState) => state.dpc.value);

	const dispatch = useDispatch();
	const [currentPokemonLife, setCurrentPokemonLife] =
		React.useState<number>(100);

	function battle() {
		const totalDamage = dpc;
		setCurrentPokemonLife(currentPokemonLife - totalDamage);
	}

	useEffect(() => {
		if (currentPokemonLife < dpc) {
			randomPokemon();
			setCurrentPokemonLife(100);
			dispatch(incrementLevel());
			console.log('level up');
		}
	}, [currentPokemonLife]);

	return (
		<View>
			<View>
				<Text>{pokemon.name}</Text>
				<Pressable
					onPress={() => {
						battle();
					}}
				>
					<Image
						source={{
							uri: pokemon.sprites.other['official-artwork']
								.front_default
						}}
						style={{ width: 300, height: 300 }}
					/>
				</Pressable>
			</View>

			<View>
				<Text>Point de vie: {currentPokemonLife}</Text>
			</View>
		</View>
	);
};

export default Pokemon;

const styles = StyleSheet.create({});
