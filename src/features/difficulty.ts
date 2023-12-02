import { createSlice } from '@reduxjs/toolkit';

export const difficultySlice = createSlice({
	name: 'dpc',
	initialState: {
		value: 1
	},
	reducers: {
		incrementDifficulty: state => {
			state.value += 1;
		}
	}
});

export const { incrementDifficulty } = difficultySlice.actions;
