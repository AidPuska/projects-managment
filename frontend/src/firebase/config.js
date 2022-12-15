import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCd5E_8EgANeGDqlqWXnCpxur-S3y4KXjw",
    authDomain: "projectsmanagment-f43a4.firebaseapp.com",
    projectId: "projectsmanagment-f43a4",
    storageBucket: "projectsmanagment-f43a4.appspot.com",
    messagingSenderId: "1959127211",
    appId: "1:1959127211:web:943396a02b3144ba3e6fee"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app)
const auth = getAuth()
const storage = getStorage(app)

export { app, db, auth, storage }

