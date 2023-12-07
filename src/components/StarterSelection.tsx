import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React from 'react';
import { PokemonImgByPokemonId } from '../constants/PokemonImgByPokemonId';
import { Starter } from '../types/starter';
import { useDispatch } from 'react-redux';
import { addUpgrades, setIsStarterSelected } from '../features/upgradesSlice';
import { incrementDpcByAmount } from '../features/dpcSlice';
import { UpgradeDetails } from '../types/upgrade';
import { db } from '../firebase/firebaseInit';
import { doc, setDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// import { InitialUpgrades } from '../constants/InitialUpgrades';

export interface StarterSelectionProps {
	getUserIsStarterSelected: () => void;
	getUserUpgrades: () => void;
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const StarterSelection: React.FC<StarterSelectionProps> = ({
	getUserIsStarterSelected,
	getUserUpgrades,
	setIsLoading
}) => {
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

	async function handlerStarterSelection(starter: Starter) {
		async function setStartUserUpgrade() {
			if (!user) return;

			setIsLoading(true);
			await setDoc(
				doc(db, 'Upgrades', `${starter.name}_${user.uid}`),
				{
					id: starter.id,
					name: starter.name,
					cost: 10,
					basicCost: 10,
					dpc: 5,
					basicDpc: 5,
					dps: 0,
					basicDps: 0,
					level: 1,
					index: 1,
					uid_user: user.uid
				},
				{ merge: true }
			);

			await setDoc(
				doc(db, 'User', `${user.uid}`),
				{
					isStarterSelected: true
				},
				{ merge: true }
			);
		}

		await setStartUserUpgrade();
		await getUserIsStarterSelected();
		await getUserUpgrades();
		setIsLoading(false);
	}

	return (
		<View style={styles.container}>
			<Text style={styles.text}>Choisis ton Pokémon de départ !</Text>
			<View style={styles.list}>
				{starters.map((starter: Starter) => (
					<TouchableOpacity
						key={starter.id}
						onPress={async () => await handlerStarterSelection(starter)}
					>
						<View style={styles.imageStarterContainer}>
							<Image
								source={PokemonImgByPokemonId[starter.id]}
								style={styles.imageStarter}
							/>
							<Text style={styles.textStarter}>{starter.name}</Text>
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
	text: {
		fontSize: 20
	},
	list: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-around',
		gap: 5
	},
	imageStarterContainer: {
		width: 125,
		height: 150,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 15,
		gap: 10
	},
	imageStarter: {
		width: '100%',
		height: '100%'
	},
	textStarter: {
		textAlign: 'center',
		fontSize: 20
	}
});
