// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB9tID7wJ8hDU3aMiIIEAaWslTmd1Qeilc",
    authDomain: "linkedin-clone-3c0db.firebaseapp.com",
    projectId: "linkedin-clone-3c0db",
    storageBucket: "linkedin-clone-3c0db.appspot.com",
    messagingSenderId: "155880102418",
    appId: "1:155880102418:web:f45f9c8c973d89aa6c56cb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, app, firestore };
