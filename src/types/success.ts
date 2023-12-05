export type SuccessDetails = {
	id: '1' | '2';
	name: string;
	icon: string;
	rewards: { amount: number; claimed: boolean }[];
	levels: number[];
	lastRewardIndexClaimed: number;
};
