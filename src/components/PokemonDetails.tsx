import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';

import { PokemonDetailsProps } from '../types/pokemon';
import { useGetPokemonDetailsQuery } from '../features/api/apiSlice';

const PokemonDetails: React.FC<PokemonDetailsProps> = pokemon => {
	const { data, error, isLoading } = useGetPokemonDetailsQuery(
		pokemon.pokemon.id
	);

	return (
		<>
			{isLoading ? (
				<Text>Loading...</Text>
			) : (
				<View>
					<View>
						<Text>{data?.name}</Text>
						<Image
							source={{
								uri: data?.sprites.other['official-artwork']
									.front_default
							}}
							style={{ width: 300, height: 300 }}
						/>
					</View>

					<View>
						<Text>Point de vie</Text>
					</View>
				</View>
			)}
		</>
	);
};

export default PokemonDetails;

const styles = StyleSheet.create({});
