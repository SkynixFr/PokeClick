//Chaque nouvelle amélioration coûtera <increaseFactor> fois plus que la précédente.
const increaseFactor = 1.2;

export function computeCost(basicCost: number, level: number) {
	return Math.floor(basicCost * increaseFactor ** level);
}
