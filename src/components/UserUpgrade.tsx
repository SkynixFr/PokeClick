// UpgradeComponent.tsx
import React, { useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { UpgradeDetails } from '../types/upgrade';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { decrementPokedollarMoneyByAmount } from '../features/moneySlice';
import { handleUpgradeBoughtById } from '../features/upgradesSlice';
import { setDpc } from '../features/dpcSlice';
import { setDps } from '../features/dpsSlice';
import { computeDPC } from '../utils/computeDPC';
import { computeDPS } from '../utils/computeDPS';

interface UpgradeComponentProps {
	upgrade: UpgradeDetails;
}

const UpgradeComponent: React.FC<UpgradeComponentProps> = ({ upgrade }) => {
	const money = useSelector((state: RootState) => state.money.pokeDollar);
	const upgrades = useSelector((state: RootState) => state.upgrades.value);
	const dispatch = useDispatch();

	const [errorMoneyMessage, setErrorMoneyMessage] = useState<string>('');

	const nextUpgradeValues = (
		basicDpc: number,
		basicDps: number,
		dps: number,
		level: number
	) => {
		return {
			nextDpc: computeDPC(basicDpc, level),
			nextDps: computeDPS(basicDps, dps, level)
		};
	};

	function onUpgrade(): void {
		if (money < upgrade.cost) {
			setErrorMoneyMessage('Not enough money !');
			setTimeout(() => {
				setErrorMoneyMessage('');
			}, 1000);
		} else {
			const { nextDpc, nextDps } = nextUpgradeValues(
				upgrade.dpc,
				upgrade.basicDps,
				upgrade.dps,
				upgrade.level + 1
			);

			dispatch(handleUpgradeBoughtById(upgrade.id));
			dispatch(decrementPokedollarMoneyByAmount(upgrade.cost));

			if (upgrade.basicDpc !== 0) dispatch(setDpc(nextDpc));
			if (upgrade.basicDps !== 0) {
				let totalDps = 0;
				upgrades.map(u => {
					totalDps += u.dps;
				});
				totalDps = totalDps - upgrade.dps + nextDps;

				dispatch(setDps(totalDps));
			}
		}
	}

	return (
		<View style={styles.container}>
			<View style={styles.leftColumn}>
				<View>
					<Text style={styles.label}>Nom: {upgrade.name}</Text>
				</View>

				<View>
					<Text style={styles.smallLabel}>
						Dégâts par seconde: {upgrade.dps}
					</Text>
					<Text style={styles.smallLabel}>
						Dégâts par click: {upgrade.dpc}
					</Text>
				</View>
			</View>

			<View style={styles.rightColumn}>
				<Text>
					Level{'\n'}
					{upgrade.level}
				</Text>
			</View>

			<View style={styles.rightColumn}>
				<Button title={`Upgrade\n[${upgrade.cost}]`} onPress={onUpgrade} />
				<Text>{errorMoneyMessage}</Text>
			</View>
		</View>
	);
};

export default UpgradeComponent;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		height: 100,
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 10
	},
	leftColumn: {
		marginLeft: 10
	},
	middleColumn: {
		flex: 1,
		alignItems: 'center'
	},
	rightColumn: {
		flex: 1,
		alignItems: 'flex-end'
	},
	label: {
		fontSize: 16 // Taille de police pour le nom
	},
	smallLabel: {
		fontSize: 12 // Taille de police plus petite pour DPS et DPC
	}
});
