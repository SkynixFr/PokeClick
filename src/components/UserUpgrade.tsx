// UpgradeComponent.tsx
import React, { useState } from 'react';
import {
	StyleSheet,
	View,
	Text,
	Button,
	Image,
	TouchableOpacity
} from 'react-native';
import { UpgradeDetails } from '../types/upgrade';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { decrementPokedollarMoneyByAmount } from '../features/moneySlice';
import { handleUpgradeBoughtById } from '../features/upgradesSlice';
import { setDpc } from '../features/dpcSlice';
import { setDps } from '../features/dpsSlice';
import { computeDPC } from '../utils/computeDPC';
import { computeDPS } from '../utils/computeDPS';
import { dpcToExpontential } from '../app/store';
import { dpsToExpontential } from '../app/store';
import { pokeDollarToExpontential } from '../app/store';
import { PokemonImgByPokemonId } from '../constants/PokemonImgByPokemonId';

interface UpgradeComponentProps {
	upgrade: UpgradeDetails;
}

const UpgradeComponent: React.FC<UpgradeComponentProps> = ({ upgrade }) => {
	const [buttonStyle, setButtonStyle] = useState(styles.button);
	const money = useSelector((state: RootState) => state.money.pokeDollar);
	const upgrades = useSelector((state: RootState) => state.upgrades.value);
	const dispatch = useDispatch();

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
			setButtonStyle(styles.buttonRed);
			setTimeout(() => {
				setButtonStyle(styles.button);
			}, 200);
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
			<Image
				source={PokemonImgByPokemonId[upgrade.id]}
				style={{ width: 70, height: 70 }} // Ajustez la taille et la marge selon vos besoins
			/>
			<View style={styles.dataColumn}>
				<View>
					<Text style={styles.label}>{upgrade.name}</Text>
				</View>

				<View>
					{upgrade.basicDps !== 0 ? (
						<Text style={styles.smallLabel}>
							Dégâts par seconde: {dpsToExpontential(upgrade.dps)}
						</Text>
					) : null}
					{upgrade.basicDpc !== 0 ? (
						<Text style={styles.smallLabel}>
							Dégâts par click: {dpcToExpontential(upgrade.dpc)}
						</Text>
					) : null}
				</View>
			</View>

			<View style={styles.levelColumn}>
				<Text>
					Level{'\n'}
					{upgrade.level}
				</Text>
			</View>

			<View style={styles.buttonColumn}>
				<TouchableOpacity style={buttonStyle} onPress={onUpgrade}>
					<Text
						style={styles.buttonText}
					>{`Upgrade\n${pokeDollarToExpontential(upgrade.cost)}`}</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default UpgradeComponent;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		height: 100,
		// justifyContent: 'space-around',
		alignItems: 'center',
		padding: 5,
		borderRadius: 10,
		backgroundColor: '#F2F2F2',
		borderWidth: 1,
		borderColor: '#E0E0E0',
		margin: 5
	},
	dataColumn: {
		marginLeft: 10,
		width: '40%'
		// borderWidth: 1
	},
	levelColumn: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
		// borderWidth: 1,
	},
	buttonColumn: {
		flexDirection: 'column',
		justifyContent: 'center'
		// borderWidth: 1
	},
	label: {
		fontSize: 16
	},
	smallLabel: {
		fontSize: 12
	},

	button: {
		backgroundColor: '#1f618d',
		padding: 10,
		borderRadius: 5,
		alignItems: 'center'
	},
	buttonRed: {
		backgroundColor: 'red',
		padding: 10,
		borderRadius: 5,
		alignItems: 'center'
	},
	buttonText: {
		color: 'white'
	}
});
