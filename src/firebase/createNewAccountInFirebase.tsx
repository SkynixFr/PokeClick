import { doc, setDoc } from 'firebase/firestore';
import { db } from './firebaseInit';
export const createNewAccountInFireStore = (
	email: string,
	uid: string | undefined
) => {
	setDoc(
		doc(db, 'User', `${uid}`),
		{
			email: email,
			uid: uid,
			isStarterSelected: false,
			level: 1,
			pokeDollars: 0,
			pokeBalls: 0
		},
		{ merge: true }
	);
};
