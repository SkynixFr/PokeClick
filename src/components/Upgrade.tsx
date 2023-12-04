import {
	StyleSheet,
	Text,
	View,
	Button,
	ActivityIndicator
} from 'react-native';
import React, { useEffect, useState } from 'react';
import UpgradeComponent from './UserUpgrade';
import {
	DocumentData,
	collection,
	getDocs,
	query,
	where
} from 'firebase/firestore';
import { db } from '../firebase/firebaseInit';

interface UpgradeComponentProps {
	user_id: string;
}

const Upgrade: React.FC<UpgradeComponentProps> = ({ user_id }) => {
	async function getData() {
		const q = query(
			collection(db, 'Upgrades'),
			where('uid_user', '==', user_id)
		);
		const querySnapshot = await getDocs(q);

		const datas = querySnapshot.docs.map(dataDetails => {
			return dataDetails.data();
		});

		setUpgrades(datas);
		console.log('data', datas);
	}

	const [upgrades, setUpgrades] = useState<DocumentData[] | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		getData().then(() => setIsLoading(false));
	}, []);

	if (!upgrades) return null;
	return !isLoading ? (
		<>
			{upgrades.map(upgrade => {
				return <UpgradeComponent upgrade={upgrade} />;
			})}
		</>
	) : (
		<ActivityIndicator />
	);
};

export default Upgrade;

const styles = StyleSheet.create({});
