import { Text, View, Image } from 'react-native';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './store';

import PokemonDetails from '../components/PokemonDetails';

import { useGetPokemonsQuery } from '../features/api/apiSlice';
import { Pokemon } from '../types/pokemon';

import HomeStyle from '../styles/home';

const Home = () => {
	const [pokemon, setPokemon] = React.useState<Pokemon | null>(null);
	const currentLevel = useSelector((state: RootState) => state.level.value);

	const dpc = useSelector((state: RootState) => state.dpc.value);

	const { data, error, isLoading } = useGetPokemonsQuery();

	const getRandomPokemons = () => {
		const randomId = Math.floor(Math.random() * 1000);

		const selectedPokemon = data!.results[randomId];

		setPokemon(selectedPokemon);
	};

	useEffect(() => {
		if (pokemon) {
			return;
		}

		if (isLoading || error || !data) {
			return;
		}

		getRandomPokemons();
	}, [data, isLoading]);

	return (
		<>
			{isLoading ? (
				<Text>Loading...</Text>
			) : (
				<View style={HomeStyle.container}>
					<View>
						<View>
							<Text>Niveau {currentLevel}</Text>
						</View>
						<View>
							<Text>DPC : {dpc}</Text>
						</View>
					</View>
					{pokemon && (
						<PokemonDetails
							pokemon={pokemon}
							randomPokemon={getRandomPokemons}
						/>
					)}
				</View>
			)}
		</>
	);
};

export default Home;
