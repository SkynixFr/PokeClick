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

const Login = ({ navigation }: RouterProps) => {
	const [email, setEmail] = React.useState<string>('');
	const [password, setPassword] = React.useState<string>('');
	const [emailError, setEmailError] = React.useState<string>('');
	const [passwordError, setPasswordError] = React.useState<string>('');

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
					<TextInput
						style={Loginstyle.input}
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
						<Text style={Loginstyle.errorText}>{passwordError}</Text>
					) : null}
					<TextInput
						style={Loginstyle.input}
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
					<View style={{ marginVertical: 5 }} />
					<Button
						onPress={() => navigation.navigate('Register')}
						title="Create an Account"
					/>
				</View>
				<View>
					<Image source={require('../../../assets/pikachu.gif')} />
				</View>
			</View>
		</>
	);
};

const Loginstyle = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F9F9F9',
		alignItems: 'center',
		justifyContent: 'center'
	},
	logo: {
		width: '100%',
		height: '20%',
		marginVertical: 20
	},

	imageBackground: {
		flex: 1,
		width: '100%',
		resizeMode: 'cover'
	},
	formContainer: {
		backgroundColor: 'white',
		padding: 20,
		borderRadius: 10,
		width: '80%',
		marginTop: 20,
		elevation: 5
	},
	input: {
		height: 40,
		borderColor: 'gray',
		borderWidth: 1,
		marginBottom: 10,
		paddingLeft: 10
	},
	errorText: {
		color: 'red',
		marginBottom: 10
	},
	Button: {
		marginVertical: 100
	}
});

export default Login;
