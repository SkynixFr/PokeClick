// Chaque nouvelle amélioration augmente le DPS de <increaseFactor> fois.
const increaseFactor = 1.5;

export function computeDPS(basicDps: number, dps: number, level: number) {
	return Math.floor(basicDps + dps * increaseFactor ** level);
}
