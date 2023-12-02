import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { RootState } from '../app/store';
import { useSelector } from 'react-redux';

import { PokemonDetails } from '../types/pokemon';

import Pokemon from './Pokemon';

const Game = () => {
	const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);

	const currentLevel = useSelector((state: RootState) => state.level.value);
	const currentDiffulty = useSelector(
		(state: RootState) => state.difficulty.value
	);
	const currentMoney = useSelector((state: RootState) => state.money.value);
	const currentDpc = useSelector((state: RootState) => state.dpc.value);
	const currentDps = useSelector((state: RootState) => state.dps.value);
	const pokemons = useSelector((state: RootState) => state.pokemons.value);

	const getRandomPokemons = () => {
		const randomId = Math.floor(Math.random() * 1000);
		const selectedPokemon = pokemons.find(
			pokemon => pokemon.id === String(randomId)
		);

		setPokemon(selectedPokemon!);
	};

	useEffect(() => {
		getRandomPokemons();
	}, [pokemons]);

	if (!pokemon) return null;

	return (
		<>
			<View>
				<View>
					<Text>
						Niveau {currentLevel} / Difficulté {currentDiffulty} / Argent{' '}
						{currentMoney}
					</Text>
				</View>
				<View>
					<Text>DPC : {currentDpc}</Text>
					<Text>DPS : {currentDps}</Text>
				</View>
			</View>

			<Pokemon pokemon={pokemon} randomPokemon={getRandomPokemons} />
		</>
	);
};

export default Game;

const styles = StyleSheet.create({});
