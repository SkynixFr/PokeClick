// Chaque nouvelle amélioration augmente le DPS de <growthCoefficient> fois.
const growthCoefficient = 1.3;

export function computeDPS(basicDps: number, level: number) {
	return Math.floor(basicDps * growthCoefficient ** level);
}
