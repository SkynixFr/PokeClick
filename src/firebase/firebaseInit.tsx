import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from '../environments/environments';

// Initialize Firebase
export const fireBaseInit = initializeApp(firebaseConfig);
// Get a reference to the database service
export const db = getFirestore(fireBaseInit);
