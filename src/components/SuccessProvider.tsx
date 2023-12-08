import React, { useEffect } from 'react';
import { ToastAndroid } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { SuccessDetails } from '../types/success';
import { RootState } from '../app/store';

export const SuccessProvider = (props: React.PropsWithChildren) => {
	const dispatch = useDispatch();
	const successList = useSelector((state: RootState) => state.success.value);
	const currentLevel = useSelector((state: RootState) => state.level.value);
	const currentClicks = useSelector((state: RootState) => state.dpc.nbClicks);

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
