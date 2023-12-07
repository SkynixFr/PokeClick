import { StyleSheet } from 'react-native';
const Loginstyle = StyleSheet.create({
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
		elevation: 5,
		textAlign: 'center'
	},
	input: {
		height: 40,
		borderColor: 'gray',
		marginBottom: 5,
		paddingLeft: 10
	},
	inputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		textAlign: 'center',
		borderColor: 'gray',
		borderWidth: 1,
		marginBottom: 10
	},
	errorText: {
		color: 'red',
		marginBottom: 10
	},
	Button: {
		marginVertical: 100
	},
	iconPassword: {
		marginLeft: '45%'
	}
});

export default Loginstyle;
