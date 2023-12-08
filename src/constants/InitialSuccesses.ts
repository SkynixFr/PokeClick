import { SuccessDetails } from '../types/success';

export const InitialSuccesses: SuccessDetails[] = [
	{
		id: '1',
		name: 'Gourou de la Gravité',
		icon: 'sort-amount-up',
		levels: [10, 50, 100, 200, 300],
		lastRewardIndexClaimed: 0,
		rewards: [
			{ amount: 10, claimed: false },
			{ amount: 20, claimed: false },
			{ amount: 30, claimed: false },
			{ amount: 40, claimed: false },
			{ amount: 50, claimed: false }
		]
	},
	{
		id: '2',
		name: 'Tyran du Tapotage',
		icon: 'hand-pointer',
		levels: [10, 100, 1000, 10000, 100000],
		lastRewardIndexClaimed: 0,
		rewards: [
			{
				amount: 10,
				claimed: false
			},
			{
				amount: 20,
				claimed: false
			},
			{
				amount: 30,
				claimed: false
			},
			{
				amount: 40,
				claimed: false
			},
			{
				amount: 50,
				claimed: false
			}
		]
	}
];
