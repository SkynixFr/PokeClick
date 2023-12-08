import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import dayjs, { Dayjs } from 'dayjs';

interface DateState {
	value: string;
}

const initialState: DateState = {
	value: dayjs().toISOString() // Initialisez avec la date actuelle
};

export const dateSlice = createSlice({
	name: 'date',
	initialState,
	reducers: {
		setDate: (state, action: PayloadAction<string>) => {
			state.value = action.payload;
		}
	}
});

export const { setDate } = dateSlice.actions;
