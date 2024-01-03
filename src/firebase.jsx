// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

//Dana: I'm trying out using the firebase-admin SDK. If this breaks everything just remove it and lmk
//import { initializeApp as adminInitializeApp } from "firebase-admin/app";

// TODO: Replace with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_SOME_API_KEY,
  authDomain: import.meta.env.VITE_SOME_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_SOME_DATABASE_URL,
  projectId: import.meta.env.VITE_SOME_PROJECT_ID,
  storageBucket: import.meta.env.VITE_SOME_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_SOME_MESSAGE_SENDER_ID,
  appId: import.meta.env.VITE_SOME_APP_ID,
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// Get a reference to the database service and export the reference for other modules
export const database = getDatabase(firebaseApp);
export const storage = getStorage(firebaseApp);
export const auth = getAuth(firebaseApp);
