import { getAuth, signOut } from 'firebase/auth';
import { Button, View } from 'react-native';
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

export const SignOutButton = () => {
	const dispatch = useDispatch();
	const pokeDollar = useSelector((state: RootState) => state.money.pokeDollar);
	const pokeBall = useSelector((state: RootState) => state.money.pokeBall);
	const auth = getAuth();
	const user = auth.currentUser;
	return (
		<View>
			<Button
				title="Sign Out"
				onPress={() => {
					signOut(auth)
						.then(async () => {
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
							dispatch(resetLevel());
							dispatch(decrementPokedollarMoneyByAmount(pokeDollar));
							dispatch(decrementPokeBallMoneyByAmount(pokeBall));
						})
						.catch(error => {
							// An error happened.
						});
				}}
			/>
		</View>
	);
};
