import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBOSde9dFrKMOI9rej3rYWH_k-92DIU0q8",
    authDomain: "gradetracker-510f0.firebaseapp.com",
    databaseURL: "https://gradetracker-510f0.firebaseio.com",
    projectId: "gradetracker-510f0",
    storageBucket: "gradetracker-510f0.appspot.com",
    messagingSenderId: "1019060211259",
    appId: "1:1019060211259:web:7f4c377ce20e640c5d961e",
    measurementId: "G-PR50490GG1"
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
    auth.signInWithPopup(provider);
};

export const signOutWithGoogle = () => {
    auth.signOut();
}