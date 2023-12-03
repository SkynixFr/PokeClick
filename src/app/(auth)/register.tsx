import { View, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import RegisterStyle from '../../styles/register';
import { Button } from '@rneui/themed';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

function registerEmailPassword(email: string, password: string) {
	try {
		const auth = getAuth();
		createUserWithEmailAndPassword(auth, email, password).then(() => {
			// Signed in
		});
	} catch (error: any) {
		const errorCode = error.code;
		const errorMessage = error.message;
		console.log(errorCode + ' ' + errorMessage);
	}
}

export const Register = () => {
	const [email, SetEmail] = useState<string>('');
	const [password, SetPassword] = useState<string>('');
	const [confirmPassword, setConfirmPassword] = useState<string>('');
	const [username, setUsername] = useState<string>('');
	return (
		<>
			<View style={RegisterStyle.container}>
				<Text>Create an Account</Text>
				<TextInput
					onChangeText={SetEmail}
					value={email}
					autoCapitalize="none"
					placeholder="Your Email"
				/>
				<TextInput
					onChangeText={setUsername}
					value={username}
					placeholder="Your Username"
				/>
				<TextInput
					onChangeText={SetPassword}
					value={password}
					autoCapitalize="none"
					secureTextEntry={true}
					placeholder="Your Password"
				/>
				<TextInput
					onChangeText={setConfirmPassword}
					value={confirmPassword}
					autoCapitalize="none"
					secureTextEntry={true}
					placeholder="Confirm Your Password"
				/>
				<Button
					title="Register"
					onPress={() => registerEmailPassword(email, password)}
				/>
			</View>
		</>
	);
};

export default Register;
