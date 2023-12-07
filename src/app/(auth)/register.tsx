import { View, Text, Alert, Image } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import React, { useState } from 'react';
import { Button } from '@rneui/themed';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { isValidEmail } from '../../handler/isValid';
import { isValidPassword } from '../../handler/isValid';
import { createNewAccountInFireStore } from '../../firebase/createNewAccountInFirebase';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseInit';
import { InitialUpgrades } from '../../constants/InitialUpgrades';
import RouterProps from '../../types/routerProps';
import RegisterStyle from '../../styles/register';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { InitialSuccesses } from '../../constants/InitialSuccesses';
async function registerEmailPassword(email: string, password: string) {
	try {
		const auth = getAuth();
		await createUserWithEmailAndPassword(auth, email, password).then(() => {
			// Signed in
			const user = auth.currentUser;
			const user_uid = user?.uid;
			//création en bd de l'utilisateur
			createNewAccountInFireStore(email, user_uid);
			//création en bd des upgrades de l'utilisateur basique
			const initialUpgrade = InitialUpgrades;
			initialUpgrade.forEach(upgrade => {
				setDoc(
					doc(db, 'Upgrades', `${upgrade.name}_${user_uid}`),
					{
						id: upgrade.id,
						name: upgrade.name,
						cost: upgrade.cost,
						basicCost: upgrade.basicCost,
						dpc: upgrade.dpc,
						basicDpc: upgrade.basicDpc,
						dps: upgrade.dps,
						basicDps: upgrade.basicDps,
						level: upgrade.level,
						index: upgrade.index,
						uid_user: user_uid
					},
					{ merge: true }
				);
			});

			const initialSuccesses = InitialSuccesses;
			initialSuccesses.forEach(success => {
				setDoc(
					doc(db, 'Successes', `${success.name}_${user_uid}`),
					{
						id: success.id,
						name: success.name,
						icon: success.icon,
						levels: success.levels,
						lastRewardIndexClaimed: success.lastRewardIndexClaimed,
						rewards: success.rewards,
						uid_user: user_uid
					},
					{ merge: true }
				);
			});
		});
	} catch (error: any) {
		const errorCode = error.code;
		const errorMessage = error.message;
		console.error(errorCode + ' ' + errorMessage);
		if (errorCode == 'auth/email-already-in-use') {
			Alert.alert('Error', 'Email déjà utilisé.');
		}
	}
}

export const Register = ({ navigation }: RouterProps) => {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [confirmPassword, setConfirmPassword] = useState<string>('');
	const [emailError, setEmailError] = useState<string>('');
	const [passwordError, setPasswordError] = useState<string>('');
	const [confirmPasswordError, setConfirmPasswordError] = useState<string>('');
	const [showPassword, setShowPassword] = useState(false);
	const handleRegister = (
		email: string,
		password: string,
		confirmPassword: string
	) => {
		if (!email || !password || !confirmPassword) {
			Alert.alert('Validation Error', 'Veuillez remplir tous les champs');
			return;
		}
		if (!emailError && !passwordError && !confirmPasswordError) {
			registerEmailPassword(email, password);
		}
	};

	const validateEmail = () => {
		if (email && !isValidEmail(email)) {
			setEmailError('Veuillez entrer un email valide.');
		} else {
			setEmailError('');
		}
	};
	const validatePassword = () => {
		if (password && !isValidPassword(password)) {
			setPasswordError(
				'Le Mot de passe doit contenir au moins 6 caractères, une majuscule, une minuscule et un chiffre.'
			);
		} else {
			setPasswordError('');
		}
	};
	const validateConfirmPassword = () => {
		if (confirmPassword && password != confirmPassword) {
			setConfirmPasswordError('Les mots de passe ne correspondent pas.');
		} else {
			setConfirmPasswordError('');
		}
	};
	// Function to toggle the password visibility state
	const toggleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	return (
		<>
			<View style={RegisterStyle.container}>
				<Image
					style={RegisterStyle.logo}
					source={require('../../../assets/PokeclickLogo.png')}
				/>
				<View style={RegisterStyle.formContainer}>
					{emailError ? (
						<Text style={RegisterStyle.errorText}>{emailError}</Text>
					) : null}
					<View style={RegisterStyle.inputContainer}>
						<TextInput
							style={RegisterStyle.emailContainer}
							onChangeText={setEmail}
							onBlur={() => {
								validateEmail();
							}}
							value={email}
							autoCapitalize="none"
							placeholder="example@gmail.com"
						/>
					</View>
					{passwordError ? (
						<Text style={{ color: 'red' }}>{passwordError}</Text>
					) : null}
					<View style={RegisterStyle.inputContainer}>
						<TextInput
							style={RegisterStyle.input}
							onChangeText={setPassword}
							secureTextEntry={!showPassword}
							onBlur={() => {
								validatePassword();
							}}
							value={password}
							autoCapitalize="none"
							placeholder="Your Password"
						/>
						<MaterialCommunityIcons
							name={showPassword ? 'eye-off' : 'eye'}
							size={24}
							color="#aaa"
							style={RegisterStyle.iconPassword}
							onPress={toggleShowPassword}
						/>
					</View>
					{confirmPasswordError ? (
						<Text style={RegisterStyle.errorText}>
							{confirmPasswordError}
						</Text>
					) : null}
					<View style={RegisterStyle.inputContainer}>
						<TextInput
							style={RegisterStyle.input}
							onChangeText={setConfirmPassword}
							secureTextEntry={!showPassword}
							onBlur={() => {
								validateConfirmPassword();
							}}
							value={confirmPassword}
							autoCapitalize="none"
							placeholder="Confirm Your Password"
						/>
					</View>
					<View style={{ marginVertical: 5 }} />
					<Button
						title="Register"
						onPress={() =>
							handleRegister(email, password, confirmPassword)
						}
					/>
					{/* séparer les deux boutons */}
					<View style={{ marginVertical: 5 }} />
					<Button
						title="Go to Login"
						onPress={() => navigation.navigate('Login')}
					/>
				</View>
				<Image
					style={RegisterStyle.ronflex}
					source={require('../../../assets/ronflexSleep.gif')}
				/>
			</View>
		</>
	);
};

export default Register;
