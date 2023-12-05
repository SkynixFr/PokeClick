import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import {
	RootState,
	dpcToExpontential,
	dpsToExpontential,
	pokeBallToExpontential,
	pokeDollarToExpontential
} from '../app/store';
import { useSelector } from 'react-redux';

import { PokemonDetails } from '../types/pokemon';

import Pokemon from './Pokemon';
import { computePokemonLife } from '../utils/computePokemonLife';
import LegendaryMythicalPokemons from '../constants/LegendaryMythicalPokemon';
import SecretZarbi from './SecretZarbi';

const Game = () => {
	const currentLevel = useSelector((state: RootState) => state.level.value);
	const currentPokedollar = useSelector(
		(state: RootState) => state.money.pokeDollar
	);
	const currentPokeball = useSelector(
		(state: RootState) => state.money.pokeBall
	);
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
	const pokemonImgRef = useRef<Image | null>(null);

	const getRandomPokemon = () => {
		const nonLegendaryPokemonIds = pokemons.map(pokemon => pokemon.id);
		const randomPosition = Math.floor(
			Math.random() * nonLegendaryPokemonIds.length
		);
		const selectedPokemon = pokemons[randomPosition];
		setPokemon(selectedPokemon!);
	};

	const getRandomLegendaryPokemon = () => {
		const legendaryPokemon = LegendaryMythicalPokemons;
		const randomId = Math.floor(Math.random() * legendaryPokemon.length);
		const selectedPokemon = legendaryPokemon[randomId];
		const newPokemonDetails: PokemonDetails = {
			id: String(selectedPokemon.id),
			name: selectedPokemon.name,
			url: `https://pokeapi.co/api/v2/pokemon/${selectedPokemon.id}/`
		};
		setPokemon(newPokemonDetails);
	};

	const battleDpc = (damage: number) => {
		setCurrentPokemonLife(prevLife => Math.max(0, prevLife - damage));
	};

	const battleDps = (damage: number) => {
		if (!pokemonImgRef.current) return;
		setCurrentPokemonLife(prevLife => Math.max(0, prevLife - damage));
	};

	const startAutoAttack = () => {
		autoAttackIntervalRef.current = setInterval(() => {
			battleDps(currentDps);
		}, 1000);
	};

	const stopAutoAttack = () => {
		if (autoAttackIntervalRef.current) {
			clearInterval(autoAttackIntervalRef.current);
			autoAttackIntervalRef.current = null;
		}
	};

	useEffect(() => {
		if (currentLevel % 100 === 0) {
			getRandomLegendaryPokemon();
		} else {
			getRandomPokemon();
		}
	}, [pokemons]);

	if (!pokemon)
		return (
			<View>
				<Text>Pas de pokemon</Text>
			</View>
		);

	return (
		<>
			<View>
				<View>
					<Text>
						Niveau {currentLevel} / Difficulté {currentDifficulty} /
						Argent {pokeDollarToExpontential(currentPokedollar)} /
						Pokeball {pokeBallToExpontential(currentPokeball)}
					</Text>
				</View>
				<View>
					<Text>DPC : {dpcToExpontential(currentDpc)}</Text>
					<Text>DPS : {dpsToExpontential(currentDps)}</Text>
				</View>
			</View>

			<Pokemon
				imgRef={pokemonImgRef}
				pokemon={pokemon}
				randomPokemon={getRandomPokemon}
				randomLegendaryPokemon={getRandomLegendaryPokemon}
				battleDpc={battleDpc}
				pokemonLife={currentPokemonLife}
				setPokemonLife={setCurrentPokemonLife}
				startAutoAttack={startAutoAttack}
				stopAutoAttack={stopAutoAttack}
			/>

			<SecretZarbi />
		</>
	);
};

export default Game;

const styles = StyleSheet.create({});
