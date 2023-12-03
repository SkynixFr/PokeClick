import { View, Text, Alert } from 'react-native';
import React, { useEffect } from 'react';
import RegisterStyle from '../../styles/register';
import { TextInput } from 'react-native-gesture-handler';
import { Button } from '@rneui/themed';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import RouterProps from '../../types/routerProps';

async function loginFirebase(email: string, password: string) {
	try {
		const auth = getAuth();
		await signInWithEmailAndPassword(auth, email, password).then(() => {
			// Signed in
		});
	} catch (error: any) {
		const errorCode = error.code;
		const errorMessage = error.message;
		if (errorCode === 'auth/invalid-credential') {
			Alert.alert('Erreur', 'Veuillez vérifiez vos identifiants');
		}
		if (errorCode === 'auth/user-disabled') {
			Alert.alert('Erreur', 'Votre compte a été désactivé');
		}
		if (errorCode === 'auth/user-not-found') {
			Alert.alert('Erreur', 'Veuillez vérifiez vos identifiants');
		}
	}
}

const isValidEmail = (email: string) => {
	const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
	return emailRegex.test(email);
};

const isValidPassword = (password: string) => {
	// Password must contain at least one lowercase letter, one uppercase letter,
	// one digit, and be at least 6 characters long
	const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
	return passwordRegex.test(password);
};

export const Login = ({ navigation }: RouterProps) => {
	const [email, setEmail] = React.useState<string>('');
	const [password, setPassword] = React.useState<string>('');
	const [emailError, setEmailError] = React.useState<string>('');
	const [passwordError, setPasswordError] = React.useState<string>('');

	const handleLogin = () => {
		if (!email || !password) {
			Alert.alert(
				'Validation Error',
				'Please enter both email and password.'
			);
			return;
		}

		if (!isValidEmail(email)) {
			setEmailError('Please enter a valid email address.');
			return;
		}

		if (!isValidPassword(password)) {
			setPasswordError(
				'Password must contain at least one lowercase letter, one uppercase letter, one digit, and be at least 6 characters long.'
			);
			return;
		}

		setEmailError('');
		setPasswordError('');
		loginFirebase(email, password);
	};

	return (
		<>
			<View style={RegisterStyle.container}>
				<Text>Login</Text>
				{emailError ? (
					<Text style={{ color: 'red' }}>{emailError}</Text>
				) : null}
				<TextInput
					onChangeText={text => {
						setEmail(text);
						setEmailError('');
					}}
					value={email}
					autoCapitalize="none"
					placeholder="Your Email"
				/>
				{passwordError ? (
					<Text style={{ color: 'red' }}>{passwordError}</Text>
				) : null}
				<TextInput
					onChangeText={text => {
						setPassword(text);
						setPasswordError('');
					}}
					value={password}
					autoCapitalize="none"
					secureTextEntry={true}
					placeholder="Your Password"
				/>
				<Button onPress={handleLogin} title="Login" />
				<Button
					onPress={() => navigation.navigate('register')}
					title="Create an Account"
				/>
			</View>
		</>
	);
};

export default Login;
