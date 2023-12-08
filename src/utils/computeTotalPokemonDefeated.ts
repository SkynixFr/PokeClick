import { computeMoney } from './computeMoney';
import { computePokemonLife } from './computePokemonLife';

export default function computeTotalPokemonDefeated(
	currentDps: number,
	idleTime: number,
	difficulty: number,
	startingLevel: number,
	isLegendary: boolean,
	baseLife: 10
): {
	pokemonDefeated: number;
	levelsConquered: number;
	pokeDollarEarned: number;
} {
	let totalPokemonDefeated = 0;
	let levelsConquered = 0;
	let currentLevel = startingLevel;
	let pokemonLife = computePokemonLife(
		difficulty,
		baseLife,
		currentLevel,
		isLegendary
	);
	let pokeDollarEarned = 0;

	for (let time = 0; time < idleTime; time++) {
		pokemonLife -= currentDps;

		if (pokemonLife <= 0) {
			currentLevel++;
			pokemonLife = computePokemonLife(
				difficulty,
				baseLife,
				currentLevel,
				isLegendary
			);
			pokeDollarEarned += computeMoney(currentLevel);
			totalPokemonDefeated++;
			levelsConquered++;
		}
	}

	return {
		pokemonDefeated: totalPokemonDefeated,
		levelsConquered: levelsConquered,
		pokeDollarEarned: pokeDollarEarned
	};
}
