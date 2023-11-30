import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import { router } from 'expo-router';

import {
	useGetPokemonsQuery,
	useLazyGetPokemonDetailsQuery
} from '../features/api/apiSlice';

import { PokemonDetails } from '../types/pokemon';
import { addPokemons } from '../features/pokemonsSlice';

const Loading = () => {
	// const [isLoading, setIsLoading] = React.useState<boolean>(false);

	// const { data, error, isLoading: isQuerying } = useGetPokemonsQuery();

	// const [trigger, { isLoading: isLazyQuering }] =
	// 	useLazyGetPokemonDetailsQuery();

	// const dispatch = useDispatch();

	// useEffect(() => {
	// 	async function getPokemons() {
	// 		if (isQuerying || error || !data) {
	// 			return;
	// 		}
	// 		setIsLoading(true);

	// 		const detailsPromises = data.results.map(async pokemon => {
	// 			const pokemonDetails = await trigger(pokemon.id);
	// 			return pokemonDetails.data;
	// 		});

	// 		const pokemonsDetails = await Promise.all(detailsPromises);
	// 		dispatch(addPokemons(pokemonsDetails as PokemonDetails[]));

	// 		setIsLoading(false);
	// 		router.replace('/home');
	// 		console.log('pokemonsDetails');
	// 	}

	// 	getPokemons();
	// }, []);

	return (
		<View style={styles.container}>
			{/* {isLoading ? (
				<Text>Loading...</Text>
			) : (
				<View>
					<Text>index</Text>
				</View>
			)} */}
		</View>
	);
};

export default Loading;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	}
});
