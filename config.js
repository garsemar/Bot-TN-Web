import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCjn03r9BX6BBvXj4pGW6x9Ovd03c-FhPw",
    authDomain: "garseweb-4b09f.firebaseapp.com",
    projectId: "garseweb-4b09f",
    storageBucket: "garseweb-4b09f.appspot.com",
    messagingSenderId: "123137956643",
    appId: "1:123137956643:web:9e11fff62462f3ef760a96",
    measurementId: "G-9DNMNTRYX1"
};

export default function initFirebase() {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
}

