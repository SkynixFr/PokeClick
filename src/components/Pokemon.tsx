import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';

import { incrementLevel } from '../features/levelSlice';

import { PokemonDetails } from '../types/pokemon';

import { PokemonImgByPokemonId } from '../constants/PokemonImgByPokemonId';
import { ComputePokemonLife } from '../utils/computePokemonLife';
import { incrementDifficulty } from '../features/difficulty';

type PokemonDetailsProps = {
	pokemon: PokemonDetails | null;
	randomPokemon: () => void;
};

const Pokemon: React.FC<PokemonDetailsProps> = ({ pokemon, randomPokemon }) => {
	const dispatch = useDispatch();
	const dpc = useSelector((state: RootState) => state.dpc.value);
	const currentLevel = useSelector((state: RootState) => state.level.value);
	const currentDifficulty = useSelector(
		(state: RootState) => state.difficulty.value
	);

	const [imageLoaded, setImageLoaded] = useState<boolean>(true);
	const [currentPokemonLife, setCurrentPokemonLife] = useState<number>(
		ComputePokemonLife(currentDifficulty, 10, currentLevel)
	);

	function battle() {
		const totalDamage = dpc;
		setCurrentPokemonLife(currentPokemonLife - totalDamage);
	}

	useEffect(() => {
		if (currentPokemonLife <= 0) {
			randomPokemon();
			dispatch(incrementLevel());
		}
	}, [currentPokemonLife]);

	useEffect(() => {
		if (currentLevel > 100 && currentLevel % 100 === 1) {
			dispatch(incrementDifficulty());
		}
	}, [currentLevel]);

	useEffect(() => {
		setCurrentPokemonLife(
			ComputePokemonLife(currentDifficulty, 10, currentLevel)
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
							if (imageLoaded) battle();
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
					{imageLoaded && <Text>Point de vie: {currentPokemonLife}</Text>}
				</View>
			</View>
		</>
	);
};

export default Pokemon;

const styles = StyleSheet.create({});
