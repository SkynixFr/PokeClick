import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { UpgradeDetails } from '../types/upgrade';

export const upgradesSlice = createSlice({
	name: 'upgrades',
	initialState: {
		value: [] as UpgradeDetails[],
		isStarterSelected: false
	},
	reducers: {
		addUpgrades: (state, action: PayloadAction<UpgradeDetails[]>) => {
			state.value = action.payload;
		},
		setIsStarterSelected: (state, action) => {
			state.isStarterSelected = action.payload;
		}
	}
});

export const { addUpgrades, setIsStarterSelected } = upgradesSlice.actions;
