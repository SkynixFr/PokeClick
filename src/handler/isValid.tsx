export const isValidEmail = (email: string): boolean => {
	const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	return emailRegex.test(email);
};

export const isValidPassword = (password: string): boolean => {
	// Password must contain at least one lowercase letter, one uppercase letter,
	// one digit, and be at least 6 characters long
	const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
	return passwordRegex.test(password);
};
