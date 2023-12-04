import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { SuccessDetails } from '../types/success';

interface SuccessState {
	value: SuccessDetails[];
}

export const successSlice = createSlice({
	name: 'success',
	initialState: {
		value: []
	},
	reducers: {
		addSuccesses: (
			state: SuccessState,
			action: PayloadAction<SuccessDetails[]>
		) => {
			state.value = action.payload;
		}
	}
});

export const { addSuccesses } = successSlice.actions;
export default successSlice.reducer;
