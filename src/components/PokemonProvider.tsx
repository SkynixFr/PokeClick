import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { useDispatch } from 'react-redux';
import {
	useGetPokemonsQuery,
	useLazyGetPokemonDetailsQuery
} from '../features/api/apiSlice';
import { addPokemons } from '../features/pokemonsSlice';
import { PokemonDetails } from '../types/pokemon';

import _ from 'lodash';

export const PokemonProvider = (props: React.PropsWithChildren) => {
	const [isLoading, setIsLoading] = React.useState<boolean>(false);

	const { data, error, isLoading: isQuerying } = useGetPokemonsQuery();

	const [trigger, { isLoading: isLazyQuering }] =
		useLazyGetPokemonDetailsQuery();

	const dispatch = useDispatch();

	useEffect(() => {
		async function getPokemons() {
			if (isQuerying || error || !data) {
				return;
			}
			setIsLoading(true);

			// const detailsPromises = data.results.map(async pokemon => {
			// 	const pokemonDetails = await trigger(pokemon.id);
			// 	return pokemonDetails.data;
			// });

			// await _.chunk(detailsPromises, 100).forEach(async chunk => {
			// 	await Promise.all(chunk).then(pokemonsDetails => {
			// 		dispatch(addPokemons(pokemonsDetails as PokemonDetails[]));
			// 	});
			// });

			setIsLoading(false);
		}

		getPokemons().then();
	}, [data]);

	return isLoading || isQuerying || isLazyQuering ? (
		<Text>Loading...</Text>
	) : (
		props.children
	);
};
