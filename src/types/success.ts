export type SuccessDetails = {
	id: string;
	name: string;
	rewards: { amount: number; claimed: boolean }[];
	levels: number[];
};
