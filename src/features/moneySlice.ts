import { createSlice } from '@reduxjs/toolkit';

export const moneySlice = createSlice({
	name: 'money',
	initialState: {
		value: 100
	},
	reducers: {
		incrementMoneyByAmount: (state, action) => {
			state.value += action.payload;
		},
		decrementMoneyByAmount: (state, action) => {
			state.value -= action.payload;
		}
	}
});

export const { incrementMoneyByAmount, decrementMoneyByAmount } =
	moneySlice.actions;
