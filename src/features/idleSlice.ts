import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export const idleSlice = createSlice({
	name: 'dps',
	initialState: {
		pokeDollarEarned: 0,
		pokemonDefeated: 0,
		levelsConquered: 0
	},
	reducers: {
		setPokeDollarEarned: (state, action: PayloadAction<number>) => {
			state.pokeDollarEarned = action.payload;
		},
		setPokemonDefeated: (state, action: PayloadAction<number>) => {
			state.pokemonDefeated = action.payload;
		},
		setLevelsConquered: (state, action: PayloadAction<number>) => {
			state.levelsConquered = action.payload;
		}
	}
});

export const { setPokeDollarEarned, setPokemonDefeated, setLevelsConquered } =
	idleSlice.actions;
