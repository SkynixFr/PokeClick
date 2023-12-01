import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import RegisterStyle from '../../styles/register';

export const Register = () => {
	const [email, SetEmail] = React.useState<string>('');
	const [password, SetPassword] = React.useState<string>('');
	const [confirmPassword, SetConfirmPassword] = React.useState<string>('');
	return (
		<>
			<View style={RegisterStyle.container}>
				<Text>Create an Account</Text>
			</View>
		</>
	);
};
export default Register;
