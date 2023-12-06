import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { UpgradeDetails } from '../types/upgrade';
import { computeCost } from '../utils/computeCost';
import { computeDPC } from '../utils/computeDPC';
import { computeDPS } from '../utils/computeDPS';

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
		},
		handleUpgradeBoughtById: (state, action: PayloadAction<number>) => {
			const upgrade = state.value.find(
				upgrade => upgrade.id === action.payload
			);
			if (upgrade) {
				upgrade.level += 1;
				upgrade.cost = computeCost(upgrade.cost, upgrade.level);

				if (upgrade.basicDpc !== 0) {
					upgrade.dpc = computeDPC(upgrade.dpc, upgrade.level);
				}

				if (upgrade.basicDps !== 0) {
					upgrade.dps = computeDPS(
						upgrade.basicDps,
						upgrade.dps,
						upgrade.level
					);
				}
			}
		}
	}
});

export const { addUpgrades, setIsStarterSelected, handleUpgradeBoughtById } =
	upgradesSlice.actions;
