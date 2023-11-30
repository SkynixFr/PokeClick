import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { apiSlice } from '../features/api/apiSlice';
import { dpcSlice } from '../features/dpcSlice';

export const store = configureStore({
	reducer: {
		[apiSlice.reducerPath]: apiSlice.reducer,
		dpc: dpcSlice.reducer
	},
	middleware: getDefaultMiddleware => {
		return getDefaultMiddleware().concat(apiSlice.middleware);
	}
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
