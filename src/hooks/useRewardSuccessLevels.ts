import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

export const useRewardSuccessLevels = () => {
	const successes = useSelector((state: RootState) => state.success.value);
	const currentLevel = useSelector((state: RootState) => state.level.value);
	const currentClicks = useSelector((state: RootState) => state.dpc.nbClicks);

	const levelSuccessLevel = () => {
		const success = successes.find(success => success.id === '1');
		if (!success) return -1;

		if (currentLevel > success.levels[success.levels.length - 1])
			return success.levels.length;
		return success.levels.findIndex(level => level > currentLevel);
	};

	const clickSuccessLevel = () => {
		const success = successes.find(success => success.id === '2');
		if (!success) return -1;

		if (currentClicks > success.levels[success.levels.length - 1])
			return success.levels.length;
		return success.levels.findIndex(level => level > currentClicks);
	};

	const successLevels = () => {
		return {
			'1': levelSuccessLevel(),
			'2': clickSuccessLevel()
		};
	};

	return {
		levelSuccessLevel,
		clickSuccessLevel,
		successLevels
	};
};
