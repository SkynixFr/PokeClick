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
import { doc, setDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { InitialUpgrades } from '../constants/InitialUpgrades';

const StarterSelection = () => {
	const dispatch = useDispatch();
	const auth = getAuth();
	const user = auth.currentUser;
	const uid = user?.uid;

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
		const Upgrades: UpgradeDetails[] = InitialUpgrades;

		const starterUpgrade: UpgradeDetails = {
			id: starter.id,
			name: starter.name,
			cost: 20,
			dpc: 2,
			dps: 0,
			level: 1,
			index: 1
		};

		Upgrades.unshift(starterUpgrade);

		createInitUpgrades();

		setDoc(
			doc(db, 'Upgrades', `${starterUpgrade.name}_${uid}`),
			{
				id: starterUpgrade.id,
				name: starterUpgrade.name,
				cost: starterUpgrade.cost,
				dpc: starterUpgrade.dpc,
				dps: starterUpgrade.dps,
				level: starterUpgrade.level,
				index: starterUpgrade.index,
				uid_user: uid
			},
			{ merge: true }
		);

		dispatch(addUpgrades(Upgrades));
		dispatch(setIsStarterSelected(true));
	}

	function createInitUpgrades() {
		InitialUpgrades.map(upgrade => {
			try {
				setDoc(
					doc(db, 'Upgrades', `${upgrade.name}_${uid}`),
					{
						id: upgrade.id,
						name: upgrade.name,
						cost: upgrade.cost,
						dpc: upgrade.dpc,
						dps: upgrade.dps,
						level: upgrade.level,
						index: upgrade.index,
						uid_user: uid
					},
					{ merge: true }
				);
			} catch (error) {
				console.error(
					`Error while initialize upgrade with name "${upgrade.name}" in firebase : ${error}`
				);
			}
		});
	}

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
