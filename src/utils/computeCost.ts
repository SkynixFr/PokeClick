//Chaque nouvelle amélioration coûtera <growthCoefficient> fois plus que la précédente.
const growthCoefficient = 1.3;

export function computeCost(basicCost: number, level: number) {
	return Math.floor(basicCost * growthCoefficient ** level);
}
