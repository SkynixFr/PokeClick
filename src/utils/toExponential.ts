export const toExponential = (number: number) => {
	if (number < 10000) return number;
	return number.toExponential(2);
};
