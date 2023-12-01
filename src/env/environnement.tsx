import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Staple FireBase Config
// Create a new file called environments.tsx in the same folder and copy the contents of this file into it.
export const firebaseConfig = {
	apiKey: 'AIzaSyAdsn_7fJbYKBLvssj0oJi5o_vhwMU1YEc',
	authDomain: 'pokeclick-e5f58.firebaseapp.com',
	projectId: 'pokeclick-e5f58',
	storageBucket: 'pokeclick-e5f58.appspot.com',
	messagingSenderId: '485445007624',
	appId: '1:485445007624:web:334f01332c2df6fd73d4bd'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
