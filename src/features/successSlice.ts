import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { SuccessDetails } from '../types/success';

interface SuccessState {
	value: SuccessDetails[];
}

export const successSlice = createSlice({
	name: 'success',
	initialState: {
		value: []
	} as SuccessState,
	reducers: {
		addSuccesses: (
			state: SuccessState,
			action: PayloadAction<SuccessDetails[]>
		) => {
			state.value = action.payload;
		},
		incrementLastRewardIndexClaimed: (
			state: SuccessState,
			action: PayloadAction<string>
		) => {
			const successIndexToEdit = state.value.findIndex(
				success => success.id === action.payload
			);
			state.value[successIndexToEdit].lastRewardIndexClaimed++;
		},
		claimRewardLevel: (
			state: SuccessState,
			action: PayloadAction<{ id: string; level: number }>
		) => {
			const { id, level } = action.payload;
			const successIndexToEdit = state.value.findIndex(
				success => success.id === id
			);
			state.value[successIndexToEdit].rewards[level].claimed = true;
		}
	}
});

export const {
	addSuccesses,
	claimRewardLevel,
	incrementLastRewardIndexClaimed
} = successSlice.actions;
export default successSlice.reducer;
