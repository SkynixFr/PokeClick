import React, { useEffect } from 'react';
import { ToastAndroid } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { SuccessDetails } from '../types/success';
import { addSuccesses } from '../features/successSlice';
import { RootState } from '../app/store';

export const SuccessProvider = (props: React.PropsWithChildren) => {
	const dispatch = useDispatch();
	const successList = useSelector((state: RootState) => state.success.value);
	const currentLevel = useSelector((state: RootState) => state.level.value);
	const currentClicks = useSelector((state: RootState) => state.dpc.nbClicks);

	// useEffect(() => {
	// 	function getSuccess() {
	// 		// const successes: SuccessDetails[] = [
	// 		// 	{
	// 		// 		id: '1',
	// 		// 		name: 'Gourou de la Gravité',
	// 		// 		icon: 'sort-amount-up',
	// 		// 		levels: [10, 50, 100, 200, 300],
	// 		// 		lastRewardIndexClaimed: 0,
	// 		// 		rewards: [
	// 		// 			{ amount: 10, claimed: false },
	// 		// 			{ amount: 20, claimed: false },
	// 		// 			{ amount: 30, claimed: false },
	// 		// 			{ amount: 40, claimed: false },
	// 		// 			{ amount: 50, claimed: false }
	// 		// 		]
	// 		// 	},
	// 		// 	{
	// 		// 		id: '2',
	// 		// 		name: 'Tyran du Tapotage',
	// 		// 		icon: 'hand-pointer',
	// 		// 		levels: [100, 1000, 10000, 100000, 1000000],
	// 		// 		lastRewardIndexClaimed: 0,
	// 		// 		rewards: [
	// 		// 			{
	// 		// 				amount: 10,
	// 		// 				claimed: false
	// 		// 			},
	// 		// 			{
	// 		// 				amount: 20,
	// 		// 				claimed: false
	// 		// 			},
	// 		// 			{
	// 		// 				amount: 30,
	// 		// 				claimed: false
	// 		// 			},
	// 		// 			{
	// 		// 				amount: 40,
	// 		// 				claimed: false
	// 		// 			},
	// 		// 			{
	// 		// 				amount: 50,
	// 		// 				claimed: false
	// 		// 			}
	// 		// 		]
	// 		// 	}
	// 		// ];
	// 		// dispatch(addSuccesses(successes));
	// 	}

	// 	getSuccess();
	// }, []);

	useEffect(() => {
		successList.forEach((success: SuccessDetails, index) => {
			if (success.id === '1' && success.levels.includes(currentLevel)) {
				ToastAndroid.show(
					`Vous avez atteint le niveau ${currentLevel} !`,
					ToastAndroid.SHORT
				);
			}

			if (
				success.id === '1' &&
				success.levels.includes(currentLevel) &&
				!success.rewards[index].claimed
			) {
				ToastAndroid.show(
					`Récompense de succès disponible pour ${success.name} !`,
					ToastAndroid.SHORT
				);
			}
		});
	}, [successList, currentLevel]);

	useEffect(() => {
		successList.forEach((success: SuccessDetails, index) => {
			if (success.id === '2' && success.levels.includes(currentClicks)) {
				ToastAndroid.show(
					`Vous avez fait ${currentClicks} clics, ça clic fort !`,
					ToastAndroid.SHORT
				);
			}

			if (
				success.id === '2' &&
				success.levels.includes(currentClicks) &&
				!success.rewards[index].claimed
			) {
				ToastAndroid.show(
					`Récompense de succès disponible pour ${success.name} !`,
					ToastAndroid.SHORT
				);
			}
		});
	}, [successList, currentClicks]);

	return props.children;
};
