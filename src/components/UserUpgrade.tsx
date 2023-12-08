// UpgradeComponent.tsx
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
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
	quantityMultiplier: number;
}

const UpgradeComponent: React.FC<UpgradeComponentProps> = ({
	upgrade,
	quantityMultiplier
}) => {
	const [buttonStyle, setButtonStyle] = useState(styles.button);
	const money = useSelector((state: RootState) => state.money.pokeDollar);
	const upgrades = useSelector((state: RootState) => state.upgrades.value);
	const dispatch = useDispatch();

	const [localMoney, setLocalMoney] = useState<number>(money);

	const nextUpgradeValues = (
		basicDpc: number,
		basicDps: number,
		level: number
	) => {
		return {
			nextDpc: computeDPC(basicDpc, level),
			nextDps: computeDPS(basicDps, level)
		};
	};

	function onUpgrade(): void {
		if (money < upgrade.cost * quantityMultiplier) {
			setButtonStyle(styles.buttonRed);
			setTimeout(() => {
				setButtonStyle(styles.button);
			}, 200);
		} else {
			const { nextDpc, nextDps } = nextUpgradeValues(
				upgrade.dpc,
				upgrade.basicDps,
				upgrade.level + quantityMultiplier
			);

			dispatch(handleUpgradeBoughtById(upgrade.id));
			dispatch(
				decrementPokedollarMoneyByAmount(upgrade.cost * quantityMultiplier)
			);

			if (upgrade.basicDpc !== 0) dispatch(setDpc(nextDpc));
			if (upgrade.basicDps !== 0) {
				let totalDps = 0;
				upgrades.map(u => {
					totalDps += u.dps;
				});
				totalDps = totalDps - upgrade.dps + nextDps;

				dispatch(setDps(totalDps));
			}

			setLocalMoney(money - upgrade.cost * quantityMultiplier);
		}
	}

	useEffect(() => {}, [money]);

	return (
		<View style={styles.container}>
			<Image
				source={PokemonImgByPokemonId[upgrade.id]}
				style={styles.imageColumn} // Ajustez la taille et la marge selon vos besoins
			/>
			<View style={styles.dataColumn}>
				<View>
					<Text style={styles.label} numberOfLines={1}>
						{upgrade.name}
					</Text>
				</View>

				<View>
					{upgrade.basicDps !== 0 ? (
						<Text style={styles.smallLabel}>
							DPS: {dpsToExpontential(upgrade.dps)}
						</Text>
					) : null}
					{upgrade.basicDpc !== 0 ? (
						<Text style={styles.smallLabel}>
							DPC: {dpcToExpontential(upgrade.dpc)}
						</Text>
					) : null}
				</View>
			</View>

			<View style={styles.levelColumn}>
				<Text>{`Level ${upgrade.level}`}</Text>
			</View>

			<View style={styles.buttonColumn}>
				<TouchableOpacity
					style={
						money < upgrade.cost ? styles.buttonDisabled : styles.button
					}
					onPress={onUpgrade}
					disabled={money < upgrade.cost}
				>
					<Text
						style={styles.buttonText}
					>{`Upgrade (x${quantityMultiplier})`}</Text>
					<Text style={styles.buttonText}>
						{pokeDollarToExpontential(upgrade.cost * quantityMultiplier)}
						<Image
							source={require('../../assets/pokeDollar.png')}
							style={{ width: 15, height: 15 }}
						></Image>
					</Text>
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
		alignItems: 'center',
		padding: 5,
		borderRadius: 10,
		backgroundColor: '#F2F2F2',
		borderWidth: 1,
		borderColor: '#E0E0E0',
		margin: 5
	},
	imageColumn: {
		width: '20%',
		height: '80%',
		resizeMode: 'contain'
	},
	dataColumn: {
		marginLeft: 10,
		width: '25%'
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
		justifyContent: 'center',
		width: '30%'
		// borderWidth: 1
	},
	label: {
		fontSize: 15
	},
	smallLabel: {
		fontSize: 11
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
	buttonDisabled: {
		backgroundColor: '#CCCCCC',
		padding: 10,
		borderRadius: 5,
		alignItems: 'center'
	},
	buttonText: {
		color: 'white',
		textAlign: 'center'
	}
});
