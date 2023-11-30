export type Pokemon = {
	id: string;
	name: string;
	url: string;
};

export type PokemonDetails = {
	id: number;
	name: string;
	sprites: PokemonSprites;
};

type PokemonSprites = {
	front_default: string;
	front_shiny: string;
	front_female: string;
	front_shiny_female: string;
	back_default: string;
	back_shiny: string;
	back_female: string;
	back_shiny_female: string;
	other: PokemonSpritesOther;
};

type PokemonSpritesOther = {
	dream_world: {
		front_default: string;
		front_female: string;
	};
	home: {
		front_default: string;
		front_female: string;
		front_shiny: string;
		front_shiny_female: string;
	};
	'official-artwork': {
		front_default: string;
		front_shiny: string;
	};
};
