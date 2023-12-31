import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { apiSlice } from '../features/api/apiSlice';
import { dpcSlice } from '../features/dpcSlice';
import { levelSlice } from '../features/levelSlice';
import { pokemonsSlice } from '../features/pokemonsSlice';
import { difficultySlice } from '../features/difficultySlice';
import { moneySlice } from '../features/moneySlice';
import { dpsSlice } from '../features/dpsSlice';
import { upgradesSlice } from '../features/upgradesSlice';
import { successSlice } from '../features/successSlice';
import { toExponential } from '../utils/toExponential';
import { dateSlice } from '../features/dateSlice';
import { idleSlice } from '../features/idleSlice';

export const store = configureStore({
	reducer: {
		[apiSlice.reducerPath]: apiSlice.reducer,
		pokemons: pokemonsSlice.reducer,
		upgrades: upgradesSlice.reducer,
		dpc: dpcSlice.reducer,
		dps: dpsSlice.reducer,
		level: levelSlice.reducer,
		difficulty: difficultySlice.reducer,
		money: moneySlice.reducer,
		success: successSlice.reducer,
		date: dateSlice.reducer,
		idle: idleSlice.reducer
	},
	middleware: getDefaultMiddleware => {
		return getDefaultMiddleware().concat(apiSlice.middleware);
	}
});

setupListeners(store.dispatch);

export const dpcToExpontential = (number: number) => {
	return toExponential(number);
};

export const dpsToExpontential = (number: number) => {
	return toExponential(number);
};

export const pokeDollarToExpontential = (number: number) => {
	return toExponential(number);
};

export const pokeBallToExpontential = (number: number) => {
	return toExponential(number);
};

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
