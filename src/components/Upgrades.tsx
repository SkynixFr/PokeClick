import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { UpgradeDetails } from '../types/upgrade';

const Upgrade = () => {
	const currentUpgrades = useSelector(
		(state: RootState) => state.upgrades.value
	);
	return (
		<View>
			{currentUpgrades.map((upgrade: UpgradeDetails) => (
				<View key={upgrade.id}>
					<Text>Nom : {upgrade.name}</Text>
					<Text>Level : {upgrade.level}</Text>
					<Text>Cout : {upgrade.cost}</Text>
					<Text>Damage : {upgrade.damage}</Text>
				</View>
			))}
		</View>
	);
};

export default Upgrade;

const styles = StyleSheet.create({});
