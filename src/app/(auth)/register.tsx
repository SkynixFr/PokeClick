import { View, Text, Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import React, { useState } from 'react';
import RegisterStyle from '../../styles/register';
import { Button } from '@rneui/themed';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { isValidEmail } from '../../handler/isValid';
import { isValidPassword } from '../../handler/isValid';
import { createNewAccountInFireStore } from '../../firebase/createNewAccountInFirebase';

async function registerEmailPassword(
	email: string,
	username: string,
	password: string
) {
	try {
		const auth = getAuth();
		await createUserWithEmailAndPassword(auth, email, password).then(() => {
			// Signed in
			const user = auth.currentUser;
			const user_uid = user?.uid;
			createNewAccountInFireStore(email, username, user_uid);
		});
	} catch (error: any) {
		const errorCode = error.code;
		const errorMessage = error.message;
		console.log(errorCode + ' ' + errorMessage);
		if (errorCode == 'auth/email-already-in-use') {
			Alert.alert('Error', 'Email already in use.');
		}
	}
}

export const Register = () => {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [confirmPassword, setConfirmPassword] = useState<string>('');
	const [username, setUsername] = useState<string>('');
	const [emailError, setEmailError] = useState<string>('');
	const [passwordError, setPasswordError] = useState<string>('');
	const [confirmPasswordError, setConfirmPasswordError] = useState<string>('');

	const handleRegister = (
		email: string,
		username: string,
		password: string,
		confirmPassword: string
	) => {
		if (!email || !username || !password || !confirmPassword) {
			Alert.alert('Validation Error', 'Please enter all fields.');
			return;
		}
		if (!emailError && !passwordError && !confirmPasswordError) {
			registerEmailPassword(email, username, password);
		}
	};

	return (
		<>
			<View style={RegisterStyle.container}>
				<Text>Create an Account</Text>
				{emailError ? (
					<Text style={{ color: 'red' }}>{emailError}</Text>
				) : null}
				<TextInput
					onChangeText={setEmail}
					onBlur={() => {
						if (email && !isValidEmail(email)) {
							setEmailError('Please enter a valid email address.');
						} else {
							setEmailError('');
						}
					}}
					value={email}
					autoCapitalize="none"
					placeholder="Your Email"
				/>
				<TextInput
					onChangeText={setUsername}
					value={username}
					placeholder="Your Username"
				/>
				{passwordError ? (
					<Text style={{ color: 'red' }}>{passwordError}</Text>
				) : null}
				<TextInput
					onChangeText={setPassword}
					secureTextEntry={true}
					onBlur={() => {
						if (password && !isValidPassword(password)) {
							setPasswordError(
								'Password must contain at least one lowercase letter, one uppercase letter, one digit, and be at least 6 characters long.'
							);
						} else {
							setPasswordError('');
						}
					}}
					value={password}
					autoCapitalize="none"
					placeholder="Your Password"
				/>
				{confirmPasswordError ? (
					<Text style={{ color: 'red' }}>{confirmPasswordError}</Text>
				) : null}
				<TextInput
					onChangeText={setConfirmPassword}
					secureTextEntry={true}
					onBlur={() => {
						if (confirmPassword && password != confirmPassword) {
							setConfirmPasswordError('Password does not match.');
						} else {
							setConfirmPasswordError('');
						}
					}}
					value={confirmPassword}
					autoCapitalize="none"
					placeholder="Confirm Your Password"
				/>
				<Button
					title="Register"
					onPress={() =>
						handleRegister(email, username, password, confirmPassword)
					}
				/>
			</View>
		</>
	);
};

export default Register;
