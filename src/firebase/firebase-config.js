import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyByERY9RHORg8MqRlOPuj2eVs9QT29Gkug",
    authDomain: "react-app-cursos-7fefd.firebaseapp.com",
    projectId: "react-app-cursos-7fefd",
    storageBucket: "react-app-cursos-7fefd.appspot.com",
    messagingSenderId: "250398810254",
    appId: "1:250398810254:web:72d46ec22e6866ea12e9df"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
    firebase
}
