import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ImageBackground } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useGetPokemonsQuery } from '../features/api/apiSlice';
import { addPokemons } from '../features/pokemonsSlice';
import StarterSelection from './StarterSelection';
import { RootState } from '../app/store';
import LegendaryMythicalPokemons from '../constants/LegendaryMythicalPokemon';
import { addUpgrades, setIsStarterSelected } from '../features/upgradesSlice';
import { UpgradeDetails } from '../types/upgrade';
import { incrementDpcByAmount } from '../features/dpcSlice';
import { getAuth } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/firebaseInit';

export const PokemonProvider = (props: React.PropsWithChildren) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isStarterSelected, setIsStarterSelected] = useState<boolean>(false);

	const { data, error, isLoading: isQuerying } = useGetPokemonsQuery();

	const dispatch = useDispatch();

	const auth = getAuth();
	const user = auth.currentUser;

	// async function initIsStarterSelected() {
	// 	if (user !== null) {
	// 		const uid = user.uid;
	// 		const q = query(
	// 			collection(db, 'Upgrades'),
	// 			where('uid_user', '==', uid)
	// 		);
	// 		const querySnapshot = await getDocs(q);

	// 		dispatch(setIsStarterSelected(!isEmpty(querySnapshot.docs)));
	// 	}
	// }

	// async function getUserUpgrades() {
	// 	if (!isStarterSelected) return;

	// 	if (user !== null) {
	// 		const uid = user.uid;

	// 		const q = query(
	// 			collection(db, 'Upgrades'),
	// 			where('uid_user', '==', uid)
	// 		);
	// 		const querySnapshot = await getDocs(q);

	// 		const upgrades: UpgradeDetails[] = [];

	// 		querySnapshot.docs.map(dataDetails => {
	// 			const currentDataDetails = dataDetails.data();

	// 			const currentUpgrade: UpgradeDetails = {
	// 				id: currentDataDetails.id,
	// 				name: currentDataDetails.name,
	// 				cost: currentDataDetails.cost,
	// 				dpc: currentDataDetails.dpc,
	// 				dps: currentDataDetails.dps,
	// 				level: currentDataDetails.level,
	// 				index: currentDataDetails.index
	// 			};

	// 			upgrades.push(currentUpgrade);

	// 			// console.log('Upgrade added to the store => ', currentUpgrade);
	// 		});

	// 		upgrades.sort(compareId);
	// 		dispatch(addUpgrades(upgrades));
	// 	}
	// }

	// function isEmpty(array: unknown[]) {
	// 	return array.length === 0;
	// }

	// function compareId(upgrade1: UpgradeDetails, upgrade2: UpgradeDetails) {
	// 	return upgrade1.index - upgrade2.index;
	// }

	const getUserIsStarterSelected = async () => {
		if (!user) return;

		const q = query(collection(db, 'User'), where('uid', '==', user.uid));
		const querySnapshot = await getDocs(q);

		querySnapshot.docs.map(dataDetails => {
			const currentDataDetails = dataDetails.data();

			setIsStarterSelected(currentDataDetails.isStarterSelected);
		});
	};

	useEffect(() => {
		function getPokemons() {
			if (isQuerying || error || !data) {
				return;
			}
			setIsLoading(true);
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

		// initIsStarterSelected();
		getPokemons();
		getUserIsStarterSelected();
		// getUserUpgrades();
	}, [data]);

	return isLoading || isQuerying ? (
		<View style={styles.container}>
			<ImageBackground
				source={require('../../assets/miaoussLoader.gif')}
				style={styles.loader}
				resizeMode="contain"
			>
				<Text style={styles.text}>Chargement des assets...</Text>
			</ImageBackground>
		</View>
	) : isStarterSelected ? (
		props.children
	) : (
		<StarterSelection getUserIsStarterSelected={getUserIsStarterSelected} />
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
