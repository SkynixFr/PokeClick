import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export const levelSlice = createSlice({
	name: 'level',
	initialState: {
		value: 0
	},
	reducers: {
		incrementLevel: state => {
			state.value += 1;
		},
		decrementLevel: state => {
			state.value -= 1;
		},
		incrementLevelByAmount: (state, action: PayloadAction<number>) => {
			state.value += action.payload;
		},
		resetLevel: state => {
			state.value = 0;
		}
	}
});

export const {
	incrementLevel,
	decrementLevel,
	incrementLevelByAmount,
	resetLevel
} = levelSlice.actions;
