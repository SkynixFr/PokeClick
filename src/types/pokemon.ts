export type Pokemon = {
	id: string;
	name: string;
	url: string;
};

export type PokemonDetails = {
	id: number;
	name: string;
	base_experience: number;
	height: number;
	is_default: boolean;
	order: number;
	weight: number;
	abilities: PokemonAbility[];
	forms: NamedAPIResource[];
	game_indices: VersionGameIndex[];
	held_items: PokemonHeldItem[];
	location_area_encounters: string;
	moves: PokemonMove[];
	past_types: PokemonTypePast[];
	sprites: PokemonSprites;
	species: NamedAPIResource;
	stats: PokemonStat[];
	types: PokemonType[];
};

type PokemonAbility = {
	is_hidden: boolean;
	slot: number;
	ability: NamedAPIResource;
};

type PokemonType = {
	slot: number;
	type: NamedAPIResource;
};

type PokemonForm = {
	slot: number;
	type: NamedAPIResource;
};

type PokemonTypePast = {
	generation: NamedAPIResource;
	types: PokemonType[];
};

type PokemonHeldItem = {
	item: NamedAPIResource;
	version_details: PokemonHeldItemVersion[];
};

type PokemonHeldItemVersion = {
	version: NamedAPIResource;
	rarity: number;
};

type PokemonMove = {
	move: NamedAPIResource;
	version_group_details: PokemonMoveVersion[];
};

type PokemonMoveVersion = {
	move_learn_method: NamedAPIResource;
	version_group: NamedAPIResource;
	level_learned_at: number;
};

type PokemonStat = {
	stat: NamedAPIResource;
	effort: number;
	base_stat: number;
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

type NamedAPIResource = {
	name: string;
	url: string;
};

type VersionGameIndex = {
	game_index: number;
	version: NamedAPIResource;
};

type Generation = {
	id: number;
	name: string;
	abilities: NamedAPIResource[];
	names: { name: string; language: NamedAPIResource }[];
};
