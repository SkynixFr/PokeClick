import { Text, View, Image } from 'react-native';
import React, { useEffect } from 'react';
import PokemonDetails from '../components/PokemonDetails';

import { useGetPokemonsQuery } from '../features/api/apiSlice';

import { Pokemon } from '../types/pokemon';

import HomeStyle from '../styles/home';

const Home = () => {
	const [pokemon, setPokemon] = React.useState<Pokemon | null>(null);

	const { data, error, isLoading } = useGetPokemonsQuery();

	useEffect(() => {
		if (pokemon) {
			return;
		}

		const getRandomPokemons = () => {
			if (isLoading || error || !data) {
				return;
			}
			const randomId = Math.floor(Math.random() * 1000);

			const selectedPokemon = data.results[randomId];

			setPokemon(selectedPokemon);
		};

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
							<Text>Niveau 1</Text>
						</View>
						<View>
							<Text>0/10</Text>
						</View>
					</View>
					{pokemon && <PokemonDetails pokemon={pokemon} />}
				</View>
			)}
		</>
	);
};

export default Home;
