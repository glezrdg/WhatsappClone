import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCwNcbw6bl5jRZBd79j-K19P-YKgfqTnoQ",
  authDomain: "whatsapp-clone-268fc.firebaseapp.com",
  projectId: "whatsapp-clone-268fc",
  storageBucket: "whatsapp-clone-268fc.appspot.com",
  messagingSenderId: "99137607220",
  appId: "1:99137607220:web:e4eedf4ef2eaad68badc61",
  measurementId: "G-MZVXFWY4GJ"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;