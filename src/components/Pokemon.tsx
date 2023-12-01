import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';

import { incrementLevel } from '../features/levelSlice';

import { PokemonDetails } from '../types/pokemon';

import { PokemonImgByPokemonId } from '../constants/PokemonImgByPokemonId';

type PokemonDetailsProps = {
	pokemon: PokemonDetails | null;
	randomPokemon: () => void;
};

const Pokemon: React.FC<PokemonDetailsProps> = ({ pokemon, randomPokemon }) => {
	const [currentPokemonLife, setCurrentPokemonLife] = useState<number>(100);
	const [imageLoaded, setImageLoaded] = useState<boolean>(true);

	const dpc = useSelector((state: RootState) => state.dpc.value);

	const dispatch = useDispatch();

	function battle() {
		const totalDamage = dpc;
		setCurrentPokemonLife(currentPokemonLife - totalDamage);
	}

	useEffect(() => {
		if (currentPokemonLife < dpc) {
			randomPokemon();
			setCurrentPokemonLife(100);
			dispatch(incrementLevel());
		}
	}, [currentPokemonLife]);

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
