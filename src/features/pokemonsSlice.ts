import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { PokemonDetails } from '../types/pokemon';

export const pokemonsSlice = createSlice({
	name: 'pokemons',
	initialState: {
		value: [] as PokemonDetails[]
	},
	reducers: {
		addPokemons: (state, action: PayloadAction<PokemonDetails[]>) => {
			state.value = action.payload;
		}
	}
});

export const { addPokemons } = pokemonsSlice.actions;
