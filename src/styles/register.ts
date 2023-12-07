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
		height: 45,
		borderColor: 'gray',
		marginBottom: '1%',
		paddingLeft: 10,
		width: '85%'
	},
	emailContainer: {
		height: 50,
		borderColor: 'gray',
		marginLeft: 10
	},
	inputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		borderColor: 'gray',
		borderWidth: 1,
		marginBottom: '1%',
		marginTop: '1%'
	},
	ronflex: {
		width: '100%',
		height: '30%'
	},
	errorText: {
		color: 'red',
		marginBottom: 10
	},
	iconPassword: {}
});

export default RegisterStyle;
