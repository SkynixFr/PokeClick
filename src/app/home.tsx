import { Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './store';

import Pokemon from '../components/Pokemon';

import { useGetPokemonsQuery } from '../features/api/apiSlice';
import { PokemonDetails } from '../types/pokemon';

import HomeStyle from '../styles/home';

const Home = () => {
	const [pokemon, setPokemon] = React.useState<PokemonDetails | undefined>(
		undefined
	);
	const currentLevel = useSelector((state: RootState) => state.level.value);
	const dpc = useSelector((state: RootState) => state.dpc.value);
	const pokemons = useSelector((state: RootState) => state.pokemons.value);

	// console.log(pokemons);

	const getRandomPokemons = () => {
		const randomId = Math.floor(Math.random() * 1000);

		const selectedPokemon = pokemons.find(pokemon => pokemon.id === randomId);

		setPokemon(selectedPokemon);
	};

	useEffect(() => {
		getRandomPokemons();
	}, []);

	return (
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
				<Pokemon pokemon={pokemon} randomPokemon={getRandomPokemons} />
			)}
		</View>
	);
};

export default Home;
