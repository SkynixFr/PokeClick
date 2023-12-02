import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export const dpsSlice = createSlice({
	name: 'dps',
	initialState: {
		value: 50
	},
	reducers: {
		incrementDps: state => {
			state.value += 1;
		},
		decrementDps: state => {
			state.value -= 1;
		},
		incrementDpsByAmount: (state, action: PayloadAction<number>) => {
			state.value += action.payload;
		}
	}
});

export const { incrementDps, decrementDps, incrementDpsByAmount } =
	dpsSlice.actions;
