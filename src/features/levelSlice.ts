import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export const levelSlice = createSlice({
	name: 'slice',
	initialState: {
		value: 1
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
		}
	}
});

export const { incrementLevel, decrementLevel, incrementLevelByAmount } =
	levelSlice.actions;
