import { StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import UpgradeComponent from './UserUpgrade';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { UpgradeDetails } from '../types/upgrade';

interface UpgradeComponentProps {}

const Upgrade: React.FC<UpgradeComponentProps> = ({}) => {
	const currentUpgrades = useSelector(
		(state: RootState) => state.upgrades.value
	);

	useEffect(() => {}, []);

	if (!currentUpgrades) return null;

	return (
		<>
			{currentUpgrades.map((upgrade: UpgradeDetails) => {
				return <UpgradeComponent upgrade={upgrade} />;
			})}
		</>
	);
};

export default Upgrade;

const styles = StyleSheet.create({});
