import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React from 'react';
import { PokemonImgByPokemonId } from '../constants/PokemonImgByPokemonId';
import { Starter } from '../types/starter';
import { useDispatch } from 'react-redux';
import {
	addUpgrades,
	setIsStarterSelected,
	upgradesSlice
} from '../features/upgradesSlice';
import { UpgradeDetails } from '../types/upgrade';
import { db } from '../firebase/firebaseInit';
import {
	collection,
	doc,
	getDocs,
	query,
	setDoc,
	where
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// import { InitialUpgrades } from '../constants/InitialUpgrades';

export interface StarterSelectionProps {
	getUserIsStarterSelected: () => void;
}

const StarterSelection: React.FC<StarterSelectionProps> = ({
	getUserIsStarterSelected
}) => {
	const dispatch = useDispatch();
	const auth = getAuth();
	const user = auth.currentUser;

	const starters: Starter[] = [
		{
			id: 387,
			name: 'Turtwig'
		},
		{
			id: 4,
			name: 'Charmender'
		},
		{
			id: 501,
			name: 'Oshawott'
		}
	];

	function handlerStarterSelection(starter: Starter) {
		// const Upgrades: UpgradeDetails[] = InitialUpgrades;

		async function setStartUserUpgrade() {
			if (!user) return;

			setDoc(
				doc(db, 'Upgrades', `${starter.name}_${user.uid}`),
				{
					id: starter.id,
					name: starter.name,
					cost: 20,
					dpc: 2,
					dps: 0,
					level: 1,
					index: 1,
					uid_user: user.uid
				},
				{ merge: true }
			);

			setDoc(
				doc(db, 'User', `${user.uid}`),
				{
					isStarterSelected: true
				},
				{ merge: true }
			);
			getUserIsStarterSelected();
		}

		const getUserUpgrades = async () => {
			if (!user) return;

			const q = query(
				collection(db, 'Upgrades'),
				where('uid_user', '==', user.uid)
			);
			const querySnapshot = await getDocs(q);

			const upgrades: UpgradeDetails[] = [];

			querySnapshot.docs.map(dataDetails => {
				const currentDataDetails = dataDetails.data();

				const currentUpgrade: UpgradeDetails = {
					id: currentDataDetails.id,
					name: currentDataDetails.name,
					cost: currentDataDetails.cost,
					dpc: currentDataDetails.dpc,
					dps: currentDataDetails.dps,
					level: currentDataDetails.level,
					index: currentDataDetails.index
				};

				upgrades.push(currentUpgrade);
			});

			dispatch(addUpgrades(upgrades));
		};

		setStartUserUpgrade();

		getUserUpgrades();

		// dispatch(addUpgrades([starterUpgrade]));

		// Upgrades.unshift(starterUpgrade);
		// createInitUpgrades();

		// setDoc(
		// 	doc(db, 'Upgrades', `${starterUpgrade.name}_${uid}`),
		// 	{
		// 		id: starterUpgrade.id,
		// 		name: starterUpgrade.name,
		// 		cost: starterUpgrade.cost,
		// 		dpc: starterUpgrade.dpc,
		// 		dps: starterUpgrade.dps,
		// 		level: starterUpgrade.level,
		// 		index: starterUpgrade.index,
		// 		uid_user: uid
		// 	},
		// 	{ merge: true }
		// );

		// dispatch(addUpgrades(Upgrades));
		// dispatch(setIsStarterSelected(true));
	}

	// function createInitUpgrades() {
	// 	InitialUpgrades.map(upgrade => {
	// 		try {
	// 			setDoc(
	// 				doc(db, 'Upgrades', `${upgrade.name}_${uid}`),
	// 				{
	// 					id: upgrade.id,
	// 					name: upgrade.name,
	// 					cost: upgrade.cost,
	// 					dpc: upgrade.dpc,
	// 					dps: upgrade.dps,
	// 					level: upgrade.level,
	// 					index: upgrade.index,
	// 					uid_user: uid
	// 				},
	// 				{ merge: true }
	// 			);
	// 		} catch (error) {
	// 			console.error(
	// 				`Error while initialize upgrade with name "${upgrade.name}" in firebase : ${error}`
	// 			);
	// 		}
	// 	});
	// }

	return (
		<View style={styles.container}>
			<Text>Choisis ton Pokémon de départ !</Text>
			<View style={styles.list}>
				{starters.map((starter: Starter) => (
					<TouchableOpacity
						key={starter.id}
						onPress={() => handlerStarterSelection(starter)}
					>
						<View>
							<Image
								source={PokemonImgByPokemonId[starter.id]}
								style={{ width: 100, height: 100 }}
							/>
							<Text>{starter.name}</Text>
						</View>
					</TouchableOpacity>
				))}
			</View>
		</View>
	);
};

export default StarterSelection;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		alignContent: 'center',
		gap: 50
	},
	list: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-around'
	}
});
