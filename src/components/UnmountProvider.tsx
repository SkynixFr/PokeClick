import { StyleSheet, AppState } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, store } from '../app/store';
import {
	collection,
	getDocs,
	query,
	setDoc,
	doc,
	where
} from 'firebase/firestore';
import { db } from '../firebase/firebaseInit';
import { getAuth } from 'firebase/auth';

const UnmountProvider = (props: React.PropsWithChildren) => {
	const auth = getAuth();
	const user = auth.currentUser;

	const appState = useRef(AppState.currentState);
	const [appStateVisible, setAppStateVisible] = useState(appState.current);

	useEffect(() => {
		const subscription = AppState.addEventListener(
			'change',
			async nextAppState => {
				appState.current = nextAppState;
				setAppStateVisible(appState.current);

				if (appState.current === 'background') {
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
				}
			}
		);
		return () => {
			subscription.remove();
		};
	}, []);

	return props.children;
};

export default UnmountProvider;

const styles = StyleSheet.create({});
