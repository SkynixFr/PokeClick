import { getAuth, signOut } from 'firebase/auth';
import { Button, View, StyleSheet, Pressable } from 'react-native';
import {
	collection,
	getDocs,
	query,
	setDoc,
	doc,
	where
} from 'firebase/firestore';
import { db } from '../firebase/firebaseInit';
import { RootState, store } from '../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { resetLevel } from '../features/levelSlice';
import {
	decrementPokeBallMoneyByAmount,
	decrementPokedollarMoneyByAmount
} from '../features/moneySlice';

import { Entypo } from '@expo/vector-icons';

export const SignOutButton = () => {
	const dispatch = useDispatch();
	const pokeDollar = useSelector((state: RootState) => state.money.pokeDollar);
	const pokeBall = useSelector((state: RootState) => state.money.pokeBall);
	const auth = getAuth();
	const user = auth.currentUser;

	const signOutUser = () => {
		signOut(auth).then(async () => {
			if (!user) return;

			await setDoc(
				doc(db, 'User', `${user.uid}`),
				{
					level: store.getState().level.value,
					pokeDollars: store.getState().money.pokeDollar,
					pokeBalls: store.getState().money.pokeBall
				},
				{ merge: true }
			);

			store.getState().upgrades.value.map(async upgrade => {
				await setDoc(
					doc(db, 'Upgrades', `${upgrade.name}_${user.uid}`),
					{
						cost: upgrade.cost,
						dpc: upgrade.dpc,
						dps: upgrade.dps,
						level: upgrade.level
					},
					{ merge: true }
				);
			});

			store.getState().success.value.map(async success => {
				await setDoc(
					doc(db, 'Successes', `${success.name}_${user.uid}`),
					{
						lastRewardIndexClaimed: success.lastRewardIndexClaimed,
						rewards: success.rewards
					},
					{ merge: true }
				);
			});
			dispatch(resetLevel());
			dispatch(decrementPokedollarMoneyByAmount(pokeDollar));
			dispatch(decrementPokeBallMoneyByAmount(pokeBall));
		});
	};
	return (
		<View style={styles.container}>
			<Pressable onPress={() => signOutUser()}>
				<View style={styles.iconContainer}>
					<Entypo name="log-out" style={styles.icon} />
				</View>
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		top: 140,
		right: 5
	},
	iconContainer: {
		width: 40,
		height: 40,
		backgroundColor: '#fff',
		borderRadius: 50,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10
	},
	icon: {
		fontSize: 20,
		color: 'crimson'
	}
});
