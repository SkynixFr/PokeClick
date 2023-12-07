export function computePokemonLife(
	difficulty: number,
	baseLife: 10,
	level: number,
	isLegendary: boolean
): number {
	const pokemonLife = level ** 2 * (baseLife + difficulty * level);
	if (isLegendary) return pokemonLife * 100;
	return pokemonLife;
}
