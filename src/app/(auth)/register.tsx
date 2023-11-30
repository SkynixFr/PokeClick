import { View, Text } from 'react-native';
import React, { useEffect } from 'react';

export const Register = () => {
	const [email, SetEmail] = React.useState<string>('');
	const [password, SetPassword] = React.useState<string>('');
	const [confirmPassword, SetConfirmPassword] = React.useState<string>('');
	return (
		<>
			<View>
				<Text>Register</Text>
			</View>
		</>
	);
};
export default Register;
