// Import the functions you need from the SDKs you needcompat/app';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDpNT7zZmH9F6X7B4IbyN1PITEQXdmYtLs',
  authDomain: 'clone-e1501.firebaseapp.com',
  projectId: 'clone-e1501',
  storageBucket: 'clone-e1501.firebasestorage.app',
  messagingSenderId: '1058497022411',
  appId: '1:1058497022411:web:044dd2f77f881222620e4e',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore();

export { auth, db };
