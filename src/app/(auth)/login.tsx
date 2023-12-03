import { View, Text, Alert } from 'react-native';
import React from 'react';
import RegisterStyle from '../../styles/register';
import { TextInput } from 'react-native-gesture-handler';
import { Button } from '@rneui/themed';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import RouterProps from '../../types/routerProps';
import { isValidEmail } from '../../handler/isValid';
import { isValidPassword } from '../../handler/isValid';

async function loginFirebase(email: string, password: string) {
	try {
		const auth = getAuth();
		await signInWithEmailAndPassword(auth, email, password).then(() => {
			// Signed in
		});
	} catch (error: any) {
		const errorCode = error.code;
		const errorMessage = error.message;
		console.log(errorCode + ' ' + errorMessage);
		// Erreur de connexion
		if (errorCode === 'auth/invalid-credential') {
			Alert.alert('Erreur', 'Veuillez vérifier vos identifiants');
		}
		if (errorCode === 'auth/user-disabled') {
			Alert.alert('Erreur', 'Votre compte a été désactivé');
		}
		if (errorCode === 'auth/user-not-found') {
			Alert.alert('Erreur', 'Veuillez vérifier vos identifiants');
		}
	}
}

export const Login = ({ navigation }: RouterProps) => {
	const [email, setEmail] = React.useState<string>('');
	const [password, setPassword] = React.useState<string>('');
	const [emailError, setEmailError] = React.useState<string>('');
	const [passwordError, setPasswordError] = React.useState<string>('');

	const validateEmail = () => {
		if (email && !isValidEmail(email)) {
			setEmailError('Please enter a valid email address.');
		} else {
			setEmailError('');
		}
	};

	const validatePassword = () => {
		if (password && !isValidPassword(password)) {
			setPasswordError(
				'Password must contain at least one lowercase letter, one uppercase letter, one digit, and be at least 6 characters long.'
			);
		} else {
			setPasswordError('');
		}
	};

	const handleLogin = () => {
		if (!email || !password) {
			Alert.alert(
				'Validation Error',
				'Please enter both email and password.'
			);
			return;
		}

		validateEmail();
		validatePassword();

		if (!emailError && !passwordError) {
			loginFirebase(email, password);
		}
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
					onBlur={validateEmail}
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
					onBlur={validatePassword}
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
