import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export default function loginEmailPassword(email: string, password: string) {
	try {
		const auth = getAuth();
		signInWithEmailAndPassword(auth, email, password).then(userCredential => {
			// Signed in
		});
	} catch (error: any) {
		const errorCode = error.code;
		const errorMessage = error.message;
		console.log(errorCode + ' ' + errorMessage);
	}
}
