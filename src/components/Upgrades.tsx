import {
	StyleSheet,
	ScrollView,
	Text,
	Button,
	View,
	Pressable,
	TouchableOpacity
} from 'react-native';
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
	const [quantityMultiplier, setQuantityMultiplier] =
		React.useState<number>(1);

	const handleQuantityMultiplier = (quantity: number) => {
		console.log(quantity);

		setQuantityMultiplier(quantity);
	};

	if (!currentUpgrades) return null;

	return (
		<>
			<View style={styles.quantityMultiplierContainer}>
				<TouchableOpacity
					onPress={() => handleQuantityMultiplier(1)}
					style={styles.quantityMultiplierButton}
				>
					<Text>x1</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => handleQuantityMultiplier(10)}
					style={styles.quantityMultiplierButton}
				>
					<Text>x10</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => handleQuantityMultiplier(100)}
					style={styles.quantityMultiplierButton}
				>
					<Text>x100</Text>
				</TouchableOpacity>
			</View>
			<ScrollView style={UpgradeStyle.container}>
				{currentUpgrades.map((upgrade: UpgradeDetails) => {
					return (
						<UpgradeComponent
							key={upgrade.id}
							upgrade={upgrade}
							quantityMultiplier={quantityMultiplier}
						/>
					);
				})}
			</ScrollView>
		</>
	);
};

export default Upgrade;

const styles = StyleSheet.create({
	quantityMultiplierContainer: {
		width: '100%',
		flexDirection: 'row',
		height: 50,
		gap: 20,

		padding: 10,
		marginBottom: 10,
		marginTop: 10,
		alignItems: 'center'
	},
	quantityMultiplierButton: {
		width: 40,
		height: 40,
		borderColor: 'black',
		borderWidth: 1,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 5
	}
});
