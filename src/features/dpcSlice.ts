import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export const dpcSlice = createSlice({
	name: 'dpc',
	initialState: {
		value: 0,
		nbClicks: 0
	},
	reducers: {
		setDpc: (state, action: PayloadAction<number>) => {
			state.value = action.payload;
		},
		incrementDpc: state => {
			state.value += 1;
		},
		decrementDpc: state => {
			state.value -= 1;
		},
		incrementDpcByAmount: (state, action: PayloadAction<number>) => {
			state.value += action.payload;
		},
		incrementClicks: state => {
			state.nbClicks += 1;
		}
	}
});

export const {
	setDpc,
	incrementDpc,
	decrementDpc,
	incrementDpcByAmount,
	incrementClicks
} = dpcSlice.actions;
