const bonusLevel: number = 5;

export function computeDPC(basicDPC: number, level: number) {
	const res = Math.round(basicDPC + bonusLevel * level);
	console.log(`${basicDPC} + ${bonusLevel} * ${level} = ${res}`);

	return res;
}
