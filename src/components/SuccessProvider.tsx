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

	useEffect(() => {
		function getSuccess() {
			const successes: SuccessDetails[] = [
				{
					id: '1',
					name: 'Tu cliques ou tu pointes ?',
					levels: [10, 50, 100, 500, 1000],
					rewards: [
						{ amount: 10, claimed: false },
						{ amount: 20, claimed: false },
						{ amount: 30, claimed: false },
						{ amount: 40, claimed: false },
						{ amount: 50, claimed: false }
					]
				}
			];

			dispatch(addSuccesses(successes));
		}

		getSuccess();
	}, []);

	useEffect(() => {
		successList.forEach((success: SuccessDetails) => {
			if (success.levels.includes(currentLevel)) {
				ToastAndroid.show(
					`Vous avez atteint le niveau ${currentLevel} !`,
					ToastAndroid.SHORT
				);
			}

			success.rewards.forEach(reward => {
				if (
					success.levels.includes(currentLevel) &&
					!reward.claimed &&
					reward.amount == currentLevel
				) {
					ToastAndroid.show(
						`Récompense de succès disponible pour ${success.name} !`,
						ToastAndroid.SHORT
					);
				}
			});
		});

		// successList.forEach(success => {
		// 	console.log(success);

		// 	if (
		// 		Array.isArray(success.levels) &&
		// 		success.levels.some(
		// 			subLevels =>
		// 				Array.isArray(subLevels) && subLevels.includes(currentLevel)
		// 		)
		// 	) {
		// 		console.log('success');
		// 		ToastAndroid.show(
		// 			`Vous avez atteint le niveau ${currentLevel} !`,
		// 			ToastAndroid.SHORT
		// 		);
		// 	}

		// 	success.rewards?.forEach(reward => {
		// 		if (
		// 			success.levels?.some(
		// 				subLevels =>
		// 					Array.isArray(subLevels) &&
		// 					subLevels.includes(currentLevel)
		// 			) &&
		// 			!reward.claimed
		// 		) {
		// 			ToastAndroid.show(
		// 				`Récompense de succès disponible pour ${success.name} !`,
		// 				ToastAndroid.SHORT
		// 			);
		// 		}
		// 	});
		// });
	}, [successList, currentLevel]);

	return props.children;
};
