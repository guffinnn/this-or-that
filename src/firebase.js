import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyBWnjjbC9rOyRqsKH-pqAiS-SQsjL2PTvE",
    authDomain: "this-or-that-game.firebaseapp.com",
    projectId: "this-or-that-game",
    storageBucket: "this-or-that-game.appspot.com",
    messagingSenderId: "205080802205",
    appId: "1:205080802205:web:c3ab652da251acba79b574",
    measurementId: "G-NQ9NMYRLZ0"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const database = getDatabase(app);

export { db };