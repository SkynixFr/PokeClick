const BONUS_PER_DIFFICULTY = 30;

export function computeMoney(difficultyLevel: number): number {
	return Math.floor(BONUS_PER_DIFFICULTY * difficultyLevel);
}
