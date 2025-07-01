import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'clone-e1501.firebaseapp.com',
  projectId: 'clone-e1501',
  storageBucket: 'clone-e1501.appspot.com',
  messagingSenderId: '1058497022411',
  appId: '1:1058497022411:web:044dd2f77f881222620e4e',
};

// Initialize Firebase (compat mode)
const app = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db };
