import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';

import { incrementLevel } from '../features/levelSlice';

import { PokemonDetails } from '../types/pokemon';

import { PokemonImgByPokemonId } from '../constants/PokemonImgByPokemonId';
import { computePokemonLife } from '../utils/computePokemonLife';
import { incrementDifficulty } from '../features/difficulty';
import { incrementMoneyByAmount } from '../features/moneySlice';
import { computeMoney } from '../utils/computeMoney';

type PokemonDetailsProps = {
	pokemon: PokemonDetails | null;
	randomPokemon: () => void;
};

const Pokemon: React.FC<PokemonDetailsProps> = ({ pokemon, randomPokemon }) => {
	const dispatch = useDispatch();
	const currentDpc = useSelector((state: RootState) => state.dpc.value);
	const currentDps = useSelector((state: RootState) => state.dps.value);
	const currentLevel = useSelector((state: RootState) => state.level.value);
	const currentDifficulty = useSelector(
		(state: RootState) => state.difficulty.value
	);

	const autoAttackIntervalRef = useRef<NodeJS.Timeout | null>(null);

	const [imageLoaded, setImageLoaded] = useState<boolean>(true);
	const [currentPokemonLife, setCurrentPokemonLife] = useState<number>(
		computePokemonLife(currentDifficulty, 10, currentLevel)
	);

	function battle(damage: number) {
		setCurrentPokemonLife(prevLife => Math.max(0, prevLife - damage));
	}

	const clickDamage = () => {
		battle(currentDpc);
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
		if (currentDps > 0) {
			startAutoAttack();
		}
		return () => {
			stopAutoAttack();
		};
	}, [currentDps]);

	useEffect(() => {
		if (currentPokemonLife <= 0) {
			randomPokemon();
			dispatch(incrementLevel());
			const moneyEarned = computeMoney();
			dispatch(incrementMoneyByAmount(moneyEarned));
		}
	}, [currentPokemonLife]);

	useEffect(() => {
		if (currentLevel > 100 && currentLevel % 100 === 1) {
			dispatch(incrementDifficulty());
		}
	}, [currentLevel]);

	useEffect(() => {
		setCurrentPokemonLife(
			computePokemonLife(currentDifficulty, 10, currentLevel)
		);
	}, [currentLevel, currentDifficulty]);

	if (!pokemon) return null;

	return (
		<>
			<View>
				<View>
					{imageLoaded && <Text>{pokemon.name}</Text>}

					<Pressable
						onPress={() => {
							if (imageLoaded) clickDamage();
						}}
					>
						<Image
							source={PokemonImgByPokemonId[pokemon.id]}
							style={{ width: 300, height: 400 }}
							resizeMode="contain"
							onLoadStart={() => {
								setImageLoaded(false);
							}}
							onLoad={() => {
								setImageLoaded(true);
							}}
							onError={err => {
								setImageLoaded(true);
							}}
						/>
					</Pressable>
				</View>

				<View>
					{imageLoaded && (
						<Text>Point de vie: {Math.round(currentPokemonLife)}</Text>
					)}
				</View>
			</View>
		</>
	);
};

export default Pokemon;

const styles = StyleSheet.create({});
