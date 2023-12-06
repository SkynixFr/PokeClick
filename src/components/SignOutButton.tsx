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
import { store } from '../app/store';

export const SignOutButton = () => {
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
						})
						.catch(error => {
							// An error happened.
						});
				}}
			/>
		</View>
	);
};
