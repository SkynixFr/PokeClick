const increaseFactor = 1.5;

export function computeDPS(basicDps: number, level: number) {
	return basicDps * increaseFactor ** level;
}
