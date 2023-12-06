const bonusLevel: number = 10;

export function computeDPC(basicDPC: number, level: number) {
	return Math.floor(basicDPC + bonusLevel * level);
}
