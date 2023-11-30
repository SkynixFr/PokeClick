import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetPokemonDetailsQuery } from '../features/api/apiSlice';
import { increment } from '../features/dpcSlice';
import { RootState } from '../app/store';

import { Pokemon } from '../types/pokemon';

type PokemonDetailsProps = {
	pokemon: Pokemon;
	randomPokemon: () => void;
};

const PokemonDetails: React.FC<PokemonDetailsProps> = ({
	pokemon,
	randomPokemon
}) => {
	const dispatch = useDispatch();
	const [currentPokemonLife, setCurrentPokemonLife] =
		React.useState<number>(100);
	const dpc = useSelector((state: RootState) => state.dpc.value);

	const { data, error, isLoading } = useGetPokemonDetailsQuery(pokemon.id);

	function battle() {
		const totalDamage = dpc;
		setCurrentPokemonLife(currentPokemonLife - totalDamage);
	}

	useEffect(() => {
		if (currentPokemonLife < dpc) {
			randomPokemon();
			setCurrentPokemonLife(100);
		}
	}, [currentPokemonLife]);

	return (
		<>
			{isLoading ? (
				<Text>Loading...</Text>
			) : (
				<View>
					<View>
						<Text>{data?.name}</Text>
						<Pressable
							onPress={() => {
								battle();
							}}
						>
							<Image
								source={{
									uri: data?.sprites.other['official-artwork']
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
			)}
		</>
	);
};

export default PokemonDetails;

const styles = StyleSheet.create({});
