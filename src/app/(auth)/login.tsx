import React from 'react';
import {
	View,
	Text,
	TextInput,
	ImageBackground,
	Image,
	StyleSheet
} from 'react-native';
import { Button } from '@rneui/themed';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Alert } from 'react-native';
import RouterProps from '../../types/routerProps';
import { isValidEmail } from '../../handler/isValid';
import { isValidPassword } from '../../handler/isValid';
import Loginstyle from '../../styles/login';
import { MaterialCommunityIcons } from '@expo/vector-icons';

async function loginFirebase(email: string, password: string) {
	try {
		const auth = getAuth();
		await signInWithEmailAndPassword(auth, email, password).then(() => {
			// Signed in
		});
	} catch (error: any) {
		const errorCode = error.code;
		const errorMessage = error.message;
		console.error(errorCode + ' ' + errorMessage);

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

const Login = ({ navigation }: RouterProps) => {
	const [email, setEmail] = React.useState<string>('');
	const [password, setPassword] = React.useState<string>('');
	const [emailError, setEmailError] = React.useState<string>('');
	const [passwordError, setPasswordError] = React.useState<string>('');
	const [showPassword, setShowPassword] = React.useState<boolean>(false);

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

	const handleLogin = () => {
		if (!email || !password) {
			Alert.alert('Validation Error', 'Veuillez remplir tous les champs.');
			return;
		}

		validateEmail();
		validatePassword();

		if (!emailError && !passwordError) {
			loginFirebase(email, password);
		}
	};
	//Afficher ou cacher le mot de passe
	const toggleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	return (
		<>
			<View style={Loginstyle.container}>
				<Image
					style={Loginstyle.logo}
					source={require('../../../assets/PokeclickLogo.png')}
				/>
				<View style={Loginstyle.formContainer}>
					{emailError ? (
						<Text style={Loginstyle.errorText}>{emailError}</Text>
					) : null}
					<View style={Loginstyle.inputContainer}>
						<TextInput
							style={Loginstyle.input}
							onChangeText={text => {
								setEmail(text);
								setEmailError('');
							}}
							onBlur={validateEmail}
							value={email}
							autoCapitalize="none"
							placeholder="example@gmail.com"
						/>
					</View>
					{passwordError ? (
						<Text style={Loginstyle.errorText}>{passwordError}</Text>
					) : null}
					<View style={Loginstyle.inputContainer}>
						<TextInput
							style={Loginstyle.input}
							onChangeText={text => {
								setPassword(text);
								setPasswordError('');
							}}
							onBlur={validatePassword}
							value={password}
							autoCapitalize="none"
							secureTextEntry={!showPassword}
							placeholder="Your Password"
						/>
						<MaterialCommunityIcons
							name={showPassword ? 'eye-off' : 'eye'}
							size={24}
							color="#aaa"
							style={Loginstyle.iconPassword}
							onPress={toggleShowPassword}
						/>
					</View>
					<Button onPress={handleLogin} title="Login" />
					{/* séparer les deux boutons */}
					<View style={{ marginVertical: 5 }} />
					<Button
						onPress={() => navigation.navigate('Register')}
						title="Create an Account"
					/>
				</View>

				<Image source={require('../../../assets/pikachu.gif')} />
			</View>
		</>
	);
};

export default Login;
