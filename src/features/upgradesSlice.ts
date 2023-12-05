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
		incrementUpgradeLevelById: (state, action: PayloadAction<number>) => {
			const upgrade = state.value.find(
				upgrade => upgrade.id === action.payload
			);
			if (upgrade) {
				upgrade.level += 1;
				upgrade.cost = Math.round(
					computeCost(upgrade.basicCost, upgrade.level)
				);

				upgrade.dpc =
					upgrade.dpc !== 0
						? Math.round(computeDPC(upgrade.basicDpc, upgrade.level))
						: 0;

				upgrade.dps =
					upgrade.dps !== 0
						? Math.round(computeDPS(upgrade.basicDps, upgrade.level))
						: 0;
			}
		}
	}
});

export const { addUpgrades, setIsStarterSelected, incrementUpgradeLevelById } =
	upgradesSlice.actions;
