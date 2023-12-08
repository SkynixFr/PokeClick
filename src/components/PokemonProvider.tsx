import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ImageBackground } from 'react-native';
import { useDispatch } from 'react-redux';
import { useGetPokemonsQuery } from '../features/api/apiSlice';
import { addPokemons } from '../features/pokemonsSlice';
import StarterSelection from './StarterSelection';
import LegendaryMythicalPokemons from '../constants/LegendaryMythicalPokemon';
import { addUpgrades } from '../features/upgradesSlice';
import { UpgradeDetails } from '../types/upgrade';
import { incrementDpcByAmount } from '../features/dpcSlice';
import { getAuth } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/firebaseInit';
import { incrementLevelByAmount } from '../features/levelSlice';
import {
	incrementPokeBallMoneyByAmount,
	incrementPokeDollarMoneyByAmount
} from '../features/moneySlice';
import { setDps } from '../features/dpsSlice';
import { SuccessDetails } from '../types/success';
import { addSuccesses } from '../features/successSlice';

export const PokemonProvider = (props: React.PropsWithChildren) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isStarterSelected, setIsStarterSelected] = useState<boolean>(false);

	const { data, error, isLoading: isQuerying } = useGetPokemonsQuery();

	const dispatch = useDispatch();

	const auth = getAuth();
	const user = auth.currentUser;

	const getUserIsStarterSelected = async () => {
		if (!user) return;

		const q = query(collection(db, 'User'), where('uid', '==', user.uid));
		const querySnapshot = await getDocs(q);

		if (!querySnapshot.docs[0]) return;
		const currentDataDetails = querySnapshot.docs[0].data();

		setIsStarterSelected(currentDataDetails.isStarterSelected);
		return currentDataDetails.isStarterSelected;
	};

	const getUserUpgrades = async () => {
		if (!user) return;

		const q = query(
			collection(db, 'Upgrades'),
			where('uid_user', '==', user.uid)
		);
		const querySnapshot = await getDocs(q);

		const upgrades: UpgradeDetails[] = [];

		let totalDps = 0;

		querySnapshot.docs.map(dataDetails => {
			const currentDataDetails = dataDetails.data();

			const currentUpgrade: UpgradeDetails = {
				id: currentDataDetails.id,
				name: currentDataDetails.name,
				cost: currentDataDetails.cost,
				basicCost: currentDataDetails.basicCost,
				dpc: currentDataDetails.dpc,
				basicDpc: currentDataDetails.basicDpc,
				dps: currentDataDetails.dps,
				basicDps: currentDataDetails.basicDps,
				level: currentDataDetails.level,
				index: currentDataDetails.index
			};

			upgrades.push(currentUpgrade);
			totalDps += currentUpgrade.dps;
		});

		upgrades.sort(compareId);

		const querySuccess = query(
			collection(db, 'Successes'),
			where('uid_user', '==', user.uid)
		);
		const querySnapshotSuccess = await getDocs(querySuccess);

		const successes: SuccessDetails[] = [];

		querySnapshotSuccess.docs.map(dataDetails => {
			const currentDataDetails = dataDetails.data();

			const currentSuccess: SuccessDetails = {
				id: currentDataDetails.id,
				name: currentDataDetails.name,
				icon: currentDataDetails.icon,
				levels: currentDataDetails.levels,
				lastRewardIndexClaimed: currentDataDetails.lastRewardIndexClaimed,
				rewards: currentDataDetails.rewards
			};

			successes.push(currentSuccess);
		});

		dispatch(addUpgrades(upgrades));
		dispatch(addSuccesses(successes));
		dispatch(setDps(totalDps));
		dispatch(setDpc(upgrades[0].dpc));
	};

	const getUserInfos = async () => {
		if (!user) return;

		const q = query(collection(db, 'User'), where('uid', '==', user.uid));
		const querySnapshot = await getDocs(q);

		querySnapshot.docs.map(dataDetails => {
			const currentDataDetails = dataDetails.data();

			dispatch(incrementLevelByAmount(currentDataDetails.level));
			dispatch(
				incrementPokeDollarMoneyByAmount(currentDataDetails.pokeDollars)
			);
			dispatch(incrementPokeBallMoneyByAmount(currentDataDetails.pokeBalls));
		});
	};

	function compareId(upgrade1: UpgradeDetails, upgrade2: UpgradeDetails) {
		return upgrade1.index - upgrade2.index;
	}

	useEffect(() => {
		async function getPokemons() {
			if (isQuerying || error || !data) {
				return;
			}
			setIsLoading(true);

			const isLocalStarterSelected = await getUserIsStarterSelected();

			if (isLocalStarterSelected) {
				await getUserInfos();
				await getUserUpgrades();
			}
			setTimeout(() => {
				const filteredPokemons = data.results.filter(
					pokemon =>
						!LegendaryMythicalPokemons.some(
							legendaryPokemon => legendaryPokemon.name === pokemon.name
						)
				);
				dispatch(addPokemons(filteredPokemons));

				setIsLoading(false);
			}, 1000);
		}

		getPokemons();
	}, [data]);

	return isLoading || isQuerying ? (
		<View style={styles.container}>
			<ImageBackground
				source={require('../../assets/miaoussLoader.gif')}
				style={styles.loader}
				resizeMode="contain"
			>
				<Text style={styles.text}>Chargement...</Text>
			</ImageBackground>
		</View>
	) : isStarterSelected ? (
		props.children
	) : (
		<StarterSelection
			getUserIsStarterSelected={getUserIsStarterSelected}
			getUserUpgrades={getUserUpgrades}
			setIsLoading={setIsLoading}
		/>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: '#feffe9'
	},
	loader: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	text: {
		marginTop: 300,
		fontSize: 20,
		fontWeight: 'bold',
		color: 'black'
	}
});
