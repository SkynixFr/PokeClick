import { createSlice } from '@reduxjs/toolkit';

export const moneySlice = createSlice({
	name: 'money',
	initialState: {
		pokeDollar: 0,
		pokeBall: 0
	},
	reducers: {
		incrementPokeDollarMoneyByAmount: (state, action) => {
			state.pokeDollar += action.payload;
		},
		decrementPokedollarMoneyByAmount: (state, action) => {
			state.pokeDollar -= action.payload;
		},
		incrementPokeBallMoneyByAmount: (state, action) => {
			state.pokeBall += action.payload;
		},
		decrementPokeBallMoneyByAmount: (state, action) => {
			state.pokeBall -= action.payload;
		}
	}
});

export const {
	incrementPokeDollarMoneyByAmount,
	decrementPokedollarMoneyByAmount,
	incrementPokeBallMoneyByAmount,
	decrementPokeBallMoneyByAmount
} = moneySlice.actions;
