import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import RegisterStyle from '../../styles/register';
import { TextInput } from 'react-native-gesture-handler';
import { Button } from '@rneui/themed';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import RouterProps from '../../types/routerProps';

function loginFirebase(email: string, password: string) {
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

export const Login = ({ navigation }: RouterProps) => {
	const [email, SetEmail] = React.useState<string>('');
	const [password, SetPassword] = React.useState<string>('');
	return (
		<>
			<View style={RegisterStyle.container}>
				<Text>Login</Text>
				<TextInput
					onChangeText={SetEmail}
					value={email}
					autoCapitalize="none"
					placeholder="Your Email"
				/>
				<TextInput
					onChangeText={SetPassword}
					value={password}
					autoCapitalize="none"
					secureTextEntry={true}
					placeholder="Your Password"
				/>
				<Button
					onPress={() => loginFirebase(email, password)}
					title="Login"
				/>
				<Button
					onPress={() => navigation.navigate('register')}
					title="Create an Account"
				/>
			</View>
		</>
	);
};
export default Login;
