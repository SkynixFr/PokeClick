import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { SuccessDetails } from '../types/success';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { incrementPokeBallMoneyByAmount } from '../features/moneySlice';
import {
	claimRewardLevel,
	incrementLastRewardIndexClaimed
} from '../features/successSlice';
import { useRewardSuccessLevels } from '../hooks/useRewardSuccessLevels';

const Quests = () => {
	const successes = useSelector((state: RootState) => state.success.value);
	const currentLevel = useSelector((state: RootState) => state.level.value);
	const currentClicks = useSelector((state: RootState) => state.dpc.nbClicks);
	const dispatch = useDispatch();
	const { successLevels } = useRewardSuccessLevels();

	const getReward = (success: SuccessDetails) => {
		const currentSuccessLevel = successLevels()[success.id];
		for (let i = 0; i < currentSuccessLevel; i++) {
			if (!success.rewards[i].claimed) {
				dispatch(claimRewardLevel({ id: success.id, level: i }));
				dispatch(incrementLastRewardIndexClaimed(success.id));
				dispatch(incrementPokeBallMoneyByAmount(success.rewards[i].amount));

				return;
			}
		}
	};

	const isRewardAvailable = (success: SuccessDetails) => {
		const currentSuccessLevel = successLevels()[success.id];
		return (
			currentSuccessLevel !== success.lastRewardIndexClaimed &&
			currentSuccessLevel !== -1
		);
	};

	const getProgressText = (success: SuccessDetails) => {
		const isAllRewardsClaimed = success.rewards.every(
			reward => reward.claimed
		);

		switch (success.id) {
			case '1':
				return isAllRewardsClaimed
					? 'Niveaux max atteint'
					: `Niveau : ${currentLevel} / ${
							success.levels[successLevels()[success.id]]
					  }`;
			case '2':
				return isAllRewardsClaimed
					? 'Niveaux max atteint'
					: `Clic : ${currentClicks} / ${
							success.levels[successLevels()[success.id]]
					  }`;
			default:
				return '';
		}
	};

	return (
		<View style={styles.successesContainer}>
			{successes.map((success: SuccessDetails) => (
				<View style={styles.successContainer} key={success.id}>
					<View>
						<FontAwesome5 name={success.icon} size={25} />
					</View>
					<View style={styles.successName}>
						<Text style={styles.name}>{success.name}</Text>
						<View style={styles.successStars}>
							{success.levels.map((level: number, index: number) => (
								<AntDesign
									key={index}
									name="star"
									size={15}
									style={{
										color: success.rewards[index].claimed
											? '#f1c40f'
											: '#283747'
									}}
								/>
							))}
						</View>
					</View>

					{isRewardAvailable(success) ? (
						<TouchableOpacity
							style={[styles.button]}
							onPress={() => getReward(success)}
						>
							<Text style={styles.buttonText}>Récompense</Text>
						</TouchableOpacity>
					) : (
						<Text>{getProgressText(success)}</Text>
					)}
				</View>
			))}
		</View>
	);
};

export default Quests;

const styles = StyleSheet.create({
	successesContainer: {
		flex: 1,
		width: '100%',
		height: '100%',
		flexDirection: 'column',
		borderBottomColor: '#000'
	},
	successContainer: {
		flexDirection: 'row',
		height: 100,
		alignItems: 'center',
		padding: 10,
		borderWidth: 1,
		borderRadius: 10,
		backgroundColor: '#F2F2F2',
		borderColor: '#E0E0E0',
		gap: 15,
		margin: 5
	},
	successStars: {
		flexDirection: 'row'
	},
	successName: {
		flex: 1
	},
	name: {
		fontSize: 16
	},
	button: {
		backgroundColor: '#1f618d',
		padding: 10,
		borderRadius: 5
	},
	buttonText: {
		color: '#ffffff',
		textAlign: 'center'
	}
});
