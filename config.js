import firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
    apiKey: "AIzaSyCT_7In9uTZ-Yw_vvNTW9mTrtCDH951mic",
    authDomain: "recipeappyayyy.firebaseapp.com",
    projectId: "recipeappyayyy",
    storageBucket: "recipeappyayyy.appspot.com",
    messagingSenderId: "301260242778",
    appId: "1:301260242778:web:0229f9f55decfaf7527d63"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore()