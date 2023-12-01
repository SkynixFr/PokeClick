import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import RegisterStyle from '../../styles/register';
import { TextInput } from 'react-native-gesture-handler';
import { Button } from '@rneui/themed';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

function loginEmailPassword(email: string, password: string) {
	try {
		const auth = getAuth();
		signInWithEmailAndPassword(auth, email, password).then(() => {
			// Signed in
		});
	} catch (error: any) {
		const errorCode = error.code;
		const errorMessage = error.message;
		console.log(errorCode + ' ' + errorMessage);
	}
}

export const Login = () => {
	const [email, SetEmail] = React.useState<string>('');
	const [password, SetPassword] = React.useState<string>('');
	return (
		<>
			<View style={RegisterStyle.container}>
				<Text>Login</Text>
				<TextInput
					onChangeText={SetEmail}
					value={email}
					placeholder="Your Email"
				/>
				<TextInput
					onChangeText={SetPassword}
					value={password}
					placeholder="Your Password"
				/>
				<Button
					onPress={() => loginEmailPassword(email, password)}
					title="Login"
				/>
				<Button title="Create account" />
			</View>
		</>
	);
};
export default Login;
