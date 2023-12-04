import { doc, setDoc } from 'firebase/firestore';
import { db } from './firebaseInit';
export const createNewAccountInFireStore = (
	username: string,
	email: string,
	uid: string | undefined
) => {
	setDoc(
		doc(db, 'User', `${uid}`),
		{
			name: username,
			email: email,
			uid: uid,
			pokedollars: 50
		},
		{ merge: true }
	);
};
