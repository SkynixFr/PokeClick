import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export const dpcSlice = createSlice({
	name: 'dpc',
	initialState: {
		value: 50000000
	},
	reducers: {
		incrementDpc: state => {
			state.value += 1;
		},
		decrementDpc: state => {
			state.value -= 1;
		},
		incrementDpcByAmount: (state, action: PayloadAction<number>) => {
			state.value += action.payload;
		}
	}
});

export const { incrementDpc, decrementDpc, incrementDpcByAmount } =
	dpcSlice.actions;
