import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import {
	RootState,
	dpcToExpontential,
	dpsToExpontential,
	pokeBallToExpontential,
	pokeDollarToExpontential
} from '../app/store';
import { useDispatch, useSelector } from 'react-redux';
import Swiper from 'react-native-swiper';

import { PokemonDetails } from '../types/pokemon';

import Pokemon from './Pokemon';
import { computePokemonLife } from '../utils/computePokemonLife';
import LegendaryMythicalPokemons from '../constants/LegendaryMythicalPokemon';
import SecretZarbi from './SecretZarbi';
import { decrementLevel } from '../features/levelSlice';

const Game = () => {
	const dispatch = useDispatch();
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
	const legendaryBattleRef = useRef<NodeJS.Timeout | null>(null);
	const pokemonImgRef = useRef<Image | null>(null);

	const [isLegendary, setIsLegendary] = useState<boolean>(false);
	const [legendaryBattleTimeRemaining, setLegendaryBattleTimeRemaining] =
		useState<number | null>(null);

	const carouselRef = useRef<Swiper | null>(null);

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

	const startTimerLegendary = () => {
		let timeLeft = 30;
		setLegendaryBattleTimeRemaining(timeLeft);
		legendaryBattleRef.current = setInterval(() => {
			timeLeft--;
			setLegendaryBattleTimeRemaining(timeLeft);

			if (timeLeft <= 0) {
				dispatch(decrementLevel());
				setLegendaryBattleTimeRemaining(null);
				setIsLegendary(false);
				stopTimerLegendary();
			}
		}, 1000);
	};

	const stopTimerLegendary = () => {
		if (legendaryBattleRef.current) {
			clearInterval(legendaryBattleRef.current);
			legendaryBattleRef.current = null;
		}
	};

	useEffect(() => {
		if (currentLevel % 100 === 0) {
			getRandomLegendaryPokemon();
			setIsLegendary(true);
			startTimerLegendary();
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

	const renderItem = (item: number, index: number) => (
		<View key={index} style={styles.carouselItem}>
			<Text>{index}</Text>
		</View>
	);

	return (
		<View style={styles.container}>
			<View style={styles.gameInfos}>
				<View style={styles.moneys}>
					<View style={styles.pokeDollars}>
						<Image
							source={require('../../assets/pokeDollar.png')}
							style={{ width: 30, height: 30 }}
						/>
						<Text>{currentPokedollar}</Text>
					</View>
					<View style={styles.pokeBalls}>
						<Image
							source={require('../../assets/pokeBall.png')}
							style={{ width: 30, height: 30 }}
						/>
						<Text>{currentPokeball}</Text>
					</View>
				</View>
				<View style={styles.damage}>
					<View style={styles.dpc}>
						<Image
							source={require('../../assets/dpc.png')}
							style={{ width: 30, height: 30 }}
						/>
						<Text>{currentDpc}</Text>
					</View>
					<View style={styles.dps}>
						<Image
							source={require('../../assets/dps.png')}
							style={{ width: 30, height: 30 }}
						/>
						<Text>{currentDps}</Text>
					</View>
				</View>
			</View>

			<Swiper
				ref={carouselRef}
				loop={false}
				showsPagination={false}
				onIndexChanged={index => {}}
			>
				{Array.from({ length: 9 }, (_, i) => currentLevel + i).map(
					(item, index) => renderItem(item, index)
				)}
			</Swiper>

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
				isLegendary={isLegendary}
				setIsLegendary={setIsLegendary}
				startTimerLegendary={startTimerLegendary}
				stopTimerLegendary={stopTimerLegendary}
				legendaryBattleTimeRemaining={legendaryBattleTimeRemaining}
			/>

			<SecretZarbi />
		</View>
	);
};

export default Game;

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: '100%'
	},
	gameInfos: {
		width: '100%',
		justifyContent: 'space-around',
		flexDirection: 'row',
		paddingTop: 45,
		paddingBottom: 15,
		backgroundColor: 'rgba(255, 255, 255, 0.8)',
		borderBottomLeftRadius: 20,
		borderBottomRightRadius: 20
	},
	moneys: {
		width: 100,
		flexDirection: 'column',
		gap: 10
	},
	pokeDollars: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10
	},
	pokeBalls: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10
	},
	damage: {
		width: 100,
		flexDirection: 'column',
		gap: 10
	},
	dpc: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10
	},
	dps: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10
	},
	levelText: {
		fontSize: 18,
		fontWeight: 'bold',
		color: 'white'
	}
});
