import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import RegisterStyle from '../../styles/register';
import { TextInput } from 'react-native-gesture-handler';
import { Button } from '@rneui/themed';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Link } from 'expo-router';
import { NavigationProp } from '@react-navigation/native';

interface RouterProps {
	navigation: NavigationProp<any, any>;
}
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
					onPress={() => loginEmailPassword(email, password)}
					title="Login"
				/>
				<Button
					onPress={() => navigation.navigate('(auth)/register')}
					title="Create an account"
				/>
			</View>
		</>
	);
};
export default Login;
