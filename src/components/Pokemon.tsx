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
import { ProgressBar } from 'react-native-paper';

import { decrementLevel, incrementLevel } from '../features/levelSlice';

import { PokemonDetails } from '../types/pokemon';

import { PokemonImgByPokemonId } from '../constants/PokemonImgByPokemonId';

import { incrementDifficulty } from '../features/difficultySlice';
import { incrementPokeDollarMoneyByAmount } from '../features/moneySlice';
import { computeMoney } from '../utils/computeMoney';
import { incrementClicks } from '../features/dpcSlice';
import { toExponential } from '../utils/toExponential';

type PokemonDetailsProps = {
	pokemon: PokemonDetails | null;
	pokemonLife: number;
	pokemonMaxLife: number;
	randomPokemon: () => void;
	randomLegendaryPokemon: () => void;
	battleDpc: (damage: number) => void;
	setPokemonLife: (life: number) => void;
	setPokemonMaxLife: (life: number) => void;
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
	pokemonMaxLife,
	randomPokemon,
	randomLegendaryPokemon,
	battleDpc,
	setPokemonLife,
	setPokemonMaxLife,
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
	const [lifeProgress, setLifeProgress] = useState<number>(1);

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
		if (currentDps >= 0) {
			startAutoAttack();
		}
		return () => {
			stopAutoAttack();
		};
	}, [currentDps]);

	useEffect(() => {
		setLifeProgress(pokemonLife / pokemonMaxLife);
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
			const moneyEarned = computeMoney(currentLevel);
			dispatch(incrementPokeDollarMoneyByAmount(moneyEarned));
		}
	}, [pokemonLife]);

	useEffect(() => {
		if (currentLevel > 100 && currentLevel % 100 === 1) {
			dispatch(incrementDifficulty());
		}
	}, [currentLevel]);

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

	if (!pokemon) return null;

	return (
		<View style={styles.container}>
			<View style={styles.pokemonWrapper}>
				{imageLoaded && (
					<View style={styles.pokemonInfos}>
						<View style={styles.pokemonName}>
							<Text>{pokemon.name.toUpperCase()}</Text>
							<Text>Lv.{currentLevel}</Text>
						</View>
						<View style={styles.progressBarContainer}>
							<ProgressBar
								animatedValue={lifeProgress}
								color={
									lifeProgress > 0.5
										? '#1e8449'
										: lifeProgress < 0.5 && lifeProgress > 0.25
										  ? '#f1c40f'
										  : '#e74c3c'
								}
								style={styles.progressBar}
								indeterminate={false}
							/>
						</View>
						<View style={styles.pokemonLife}>
							<Text>
								{toExponential(pokemonLife)} /{' '}
								{toExponential(pokemonMaxLife)}
							</Text>
						</View>
						{imageLoaded && isLegendary && (
							<View style={styles.timeContainer}>
								<Image
									source={require('../../assets/time.png')}
									style={{ width: 20, height: 20 }}
								/>
								<Text
									style={
										legendaryBattleTimeRemaining! >= 20
											? {
													color: '#000',
													fontWeight: 'bold',
													fontSize: 16
											  }
											: legendaryBattleTimeRemaining! < 20 &&
											    legendaryBattleTimeRemaining! >= 10
											  ? {
														color: '#d68910',
														fontWeight: 'bold',
														fontSize: 16
											    }
											  : {
														color: '#e74c3c',
														fontWeight: 'bold',
														fontSize: 16
											    }
									}
								>
									{legendaryBattleTimeRemaining} sec
								</Text>
							</View>
						)}
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
		minHeight: 75,
		padding: 10,
		backgroundColor: '#f8f9f9',
		borderWidth: 1,
		borderTopLeftRadius: 10,
		borderBottomRightRadius: 10,
		gap: 10,
		elevation: 20,
		shadowColor: '#52006A'
	},
	pokemonName: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	progressBarContainer: {
		width: '90%',
		marginLeft: '10%'
	},
	progressBar: {
		width: '100%',
		borderRadius: 10,
		height: 10
	},
	pokemonLife: {
		width: '100%',
		justifyContent: 'flex-end',
		alignItems: 'flex-end'
	},
	timeContainer: {
		width: '50%',
		marginLeft: '25%',
		marginRight: '25%',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 10
	},
	pokemonImage: {
		width: 200,
		height: 225
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
