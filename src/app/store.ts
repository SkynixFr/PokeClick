import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { apiSlice } from '../features/api/apiSlice';
import { dpcSlice } from '../features/dpcSlice';
import { levelSlice } from '../features/levelSlice';
import { pokemonsSlice } from '../features/pokemonsSlice';
import { difficultySlice } from '../features/difficulty';
import { moneySlice } from '../features/moneySlice';

export const store = configureStore({
	reducer: {
		[apiSlice.reducerPath]: apiSlice.reducer,
		pokemons: pokemonsSlice.reducer,
		dpc: dpcSlice.reducer,
		level: levelSlice.reducer,
		difficulty: difficultySlice.reducer,
		money: moneySlice.reducer
	},
	middleware: getDefaultMiddleware => {
		return getDefaultMiddleware().concat(apiSlice.middleware);
	}
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
