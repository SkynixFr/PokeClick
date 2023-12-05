const increaseFactor = 1.1;

export function computeCost(basicCost: number, level: number) {
	return basicCost * increaseFactor ** level;
}
