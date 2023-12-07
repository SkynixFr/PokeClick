import {
	StyleSheet,
	Text,
	View,
	Image,
	Pressable,
	Dimensions
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { ProgressBar, MD3Colors } from 'react-native-paper';

import { decrementLevel, incrementLevel } from '../features/levelSlice';

import { PokemonDetails } from '../types/pokemon';

import { PokemonImgByPokemonId } from '../constants/PokemonImgByPokemonId';
import { computePokemonLife } from '../utils/computePokemonLife';
import { incrementDifficulty } from '../features/difficultySlice';
import { incrementPokeDollarMoneyByAmount } from '../features/moneySlice';
import { computeMoney } from '../utils/computeMoney';
import { incrementClicks } from '../features/dpcSlice';
import { toExponential } from '../utils/toExponential';
import { number } from 'zod';

type PokemonDetailsProps = {
	pokemon: PokemonDetails | null;
	pokemonLife: number;
	randomPokemon: () => void;
	randomLegendaryPokemon: () => void;
	battleDpc: (damage: number) => void;
	setPokemonLife: (life: number) => void;
	startAutoAttack: () => void;
	stopAutoAttack: () => void;
	imgRef: React.MutableRefObject<Image | null>;
	isLegendary: boolean;
	setIsLegendary: (isLegendary: boolean) => void;
	startTimerLegendary: () => void;
	stopTimerLegendary: () => void;
	legendaryBattleTimeRemaining: number | null;
};

const Pokemon: React.FC<PokemonDetailsProps> = ({
	pokemon,
	pokemonLife,
	randomPokemon,
	randomLegendaryPokemon,
	battleDpc,
	setPokemonLife,
	startAutoAttack,
	stopAutoAttack,
	imgRef,
	isLegendary,
	setIsLegendary,
	startTimerLegendary,
	stopTimerLegendary,
	legendaryBattleTimeRemaining
}) => {
	const dispatch = useDispatch();
	const currentDpc = useSelector((state: RootState) => state.dpc.value);
	const currentDps = useSelector((state: RootState) => state.dps.value);
	const currentLevel = useSelector((state: RootState) => state.level.value);
	const currentDifficulty = useSelector(
		(state: RootState) => state.difficulty.value
	);

	const [pokemonMaxLife, setPokemonMaxLife] = useState<number>(0);

	const [imageLoaded, setImageLoaded] = useState<boolean>(true);
	const [damageDisplay, setDamageDisplay] = useState<{
		x: number;
		y: number;
	} | null>(null);

	const clickDamage = () => {
		battleDpc(currentDpc);
		dispatch(incrementClicks());
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
		if (pokemonLife <= 0) {
			if ((currentLevel + 1) % 100 === 0) {
				randomLegendaryPokemon();
				setIsLegendary(true);
				startTimerLegendary();
			} else {
				stopTimerLegendary();
				setIsLegendary(false);
				randomPokemon();
			}
			dispatch(incrementLevel());
			const moneyEarned = computeMoney();
			dispatch(incrementPokeDollarMoneyByAmount(moneyEarned));
		}
	}, [pokemonLife]);

	useEffect(() => {
		if (currentLevel > 100 && currentLevel % 100 === 1) {
			dispatch(incrementDifficulty());
		}
	}, [currentLevel]);

	useEffect(() => {
		setPokemonLife(computePokemonLife(currentDifficulty, 10, currentLevel));
	}, [currentLevel, currentDifficulty]);

	useEffect(() => {
		if (damageDisplay) {
			const timer = setTimeout(() => {
				setDamageDisplay(null);
			}, 3000);
			return () => {
				clearTimeout(timer);
			};
		}
	}, [damageDisplay]);

	useEffect(() => {
		if (!isLegendary) {
			if (currentLevel % 100 === 0) {
				randomLegendaryPokemon();
			} else {
				randomPokemon();
			}
		}
	}, [isLegendary]);

	useEffect(() => {
		setPokemonMaxLife(pokemonLife);
	}, []);

	if (!pokemon) return null;

	return (
		<View style={styles.container}>
			<View style={styles.pokemonWrapper}>
				{imageLoaded && isLegendary && (
					<View>
						<Text>Temps restant : {legendaryBattleTimeRemaining} s</Text>
					</View>
				)}

				{imageLoaded && (
					<View style={styles.pokemonInfos}>
						<View>
							<Text>{pokemon.name.toUpperCase()}</Text>
						</View>
						<View>
							<ProgressBar
								progress={0.5}
								color={MD3Colors.error50}
								style={styles.progressBar}
							/>
						</View>
						<View style={styles.pokemonLife}>
							<Text>
								{toExponential(pokemonLife)} /{' '}
								{toExponential(pokemonMaxLife)}
							</Text>
						</View>
					</View>
				)}

				<Pressable
					onPress={event => {
						if (imageLoaded) {
							const { locationX, locationY } = event.nativeEvent;
							setDamageDisplay({ x: locationX, y: locationY });
							clickDamage();
						}
					}}
				>
					<Image
						ref={imgRef}
						source={PokemonImgByPokemonId[pokemon.id]}
						resizeMode="contain"
						style={styles.pokemonImage}
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
		</View>
	);
};

export default Pokemon;

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: Dimensions.get('window').height - 164
	},
	pokemonWrapper: {
		position: 'absolute',
		bottom: 70,
		width: '100%',
		height: '100%',
		display: 'flex',
		justifyContent: 'flex-end',
		alignItems: 'center',
		gap: 25
	},
	pokemonInfos: {
		width: '60%',
		marginLeft: '20%',
		marginRight: '20%',
		height: 75,
		padding: 10,
		backgroundColor: 'rgba(255, 255, 255, 0.9)',
		borderWidth: 2,
		borderTopLeftRadius: 10,
		borderBottomRightRadius: 10,
		gap: 5
	},
	progressBar: {
		width: '90%',
		height: 10,
		marginLeft: '10%'
	},
	pokemonLife: {
		width: '100%',
		justifyContent: 'flex-end',
		alignItems: 'flex-end'
	},
	pokemonImage: {
		width: 175,
		height: 150
	},
	damageDisplay: {
		position: 'absolute',
		zIndex: 1000
	},
	damageDisplayText: {
		fontWeight: 'bold',
		fontSize: 25,
		color: 'crimson'
	}
});
