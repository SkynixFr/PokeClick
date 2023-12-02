export function ComputePokemonLife(
	difficulty: number,
	baseLife: 10,
	level: number
): number {
	return level ** 2 * (baseLife + difficulty * level);
}
