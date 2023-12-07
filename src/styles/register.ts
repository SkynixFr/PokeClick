import { StyleSheet } from 'react-native';
const RegisterStyle = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F9F9F9',
		alignItems: 'center',
		justifyContent: 'center'
	},
	logo: {
		width: '90%',
		height: '20%',

		marginVertical: 20,
		resizeMode: 'contain'
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

		marginBottom: 10,
		paddingLeft: 10
	},
	emailContainer: {
		height: 40,
		borderColor: 'gray',
		marginLeft: 10,
		marginBottom: 10
	},
	inputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		borderColor: 'gray',
		borderWidth: 1,
		marginBottom: 10
	},
	ronflex: {
		width: '100%',
		height: '30%'
	},
	errorText: {
		color: 'red',
		marginBottom: 10
	},
	iconPassword: {
		marginLeft: '40%'
	},
	iconConfirmPassword: {
		marginLeft: '20%'
	}
});

export default RegisterStyle;
