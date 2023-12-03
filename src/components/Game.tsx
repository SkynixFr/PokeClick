import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { RootState } from '../app/store';
import { useSelector } from 'react-redux';

import { PokemonDetails } from '../types/pokemon';

import Pokemon from './Pokemon';
import { computePokemonLife } from '../utils/computePokemonLife';

const Game = () => {
	const currentLevel = useSelector((state: RootState) => state.level.value);
	const currentDiffulty = useSelector(
		(state: RootState) => state.difficulty.value
	);
	const currentMoney = useSelector((state: RootState) => state.money.value);
	const currentDpc = useSelector((state: RootState) => state.dpc.value);
	const currentDps = useSelector((state: RootState) => state.dps.value);
	const currentDifficulty = useSelector(
		(state: RootState) => state.difficulty.value
	);
	const pokemons = useSelector((state: RootState) => state.pokemons.value);

	const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
	const [currentPokemonLife, setCurrentPokemonLife] = useState<number>(
		computePokemonLife(currentDifficulty, 10, currentLevel)
	);

	const autoAttackIntervalRef = useRef<NodeJS.Timeout | null>(null);

	const getRandomPokemons = () => {
		const randomId = Math.floor(Math.random() * 1000);
		const selectedPokemon = pokemons.find(
			pokemon => pokemon.id === String(randomId)
		);

		setPokemon(selectedPokemon!);
	};

	const battle = (damage: number) => {
		setCurrentPokemonLife(prevLife => Math.max(0, prevLife - damage));
	};

	const startAutoAttack = () => {
		autoAttackIntervalRef.current = setInterval(() => {
			battle(currentDps);
		}, 1000);
	};

	const stopAutoAttack = () => {
		if (autoAttackIntervalRef.current) {
			clearInterval(autoAttackIntervalRef.current);
			autoAttackIntervalRef.current = null;
		}
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

			<Pokemon
				pokemon={pokemon}
				randomPokemon={getRandomPokemons}
				battle={battle}
				pokemonLife={currentPokemonLife}
				setPokemonLife={setCurrentPokemonLife}
				startAutoAttack={startAutoAttack}
				stopAutoAttack={stopAutoAttack}
			/>
		</>
	);
};

export default Game;

const styles = StyleSheet.create({});
