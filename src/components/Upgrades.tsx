import { StyleSheet, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import UpgradeComponent from './UserUpgrade';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { UpgradeDetails } from '../types/upgrade';
import UpgradeStyle from '../styles/upgrade';

interface UpgradeComponentProps {}

const Upgrade: React.FC<UpgradeComponentProps> = ({}) => {
	const currentUpgrades = useSelector(
		(state: RootState) => state.upgrades.value
	);

	useEffect(() => {
		// Add any side effects you want to run on component mount here
	}, []);

	if (!currentUpgrades) return null;

	return (
		<>
			<ScrollView style={UpgradeStyle.container}>
				{currentUpgrades.map((upgrade: UpgradeDetails) => {
					return <UpgradeComponent key={upgrade.id} upgrade={upgrade} />;
				})}
			</ScrollView>
		</>
	);
};

export default Upgrade;
