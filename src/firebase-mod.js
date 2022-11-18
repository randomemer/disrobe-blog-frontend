// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyCq8gRezuLKYrgb-I__0mqYYBoDD2t3hhs",
	authDomain: "stories-blog-15b84.firebaseapp.com",
	projectId: "stories-blog-15b84",
	storageBucket: "stories-blog-15b84.appspot.com",
	messagingSenderId: "459578242620",
	appId: "1:459578242620:web:0f2fcbb7050f1430c5f539",
	measurementId: "G-E8Q6PTNQZB",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
