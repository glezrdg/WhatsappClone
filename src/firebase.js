import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCpTlzg6RAdfnzQX8A-sXnbajHSCOH0BH4",
  authDomain: "whatsapp-clone-fcd3f.firebaseapp.com",
  projectId: "whatsapp-clone-fcd3f",
  storageBucket: "whatsapp-clone-fcd3f.appspot.com",
  messagingSenderId: "359761166573",
  appId: "1:359761166573:web:6100b3ee972149f0734ce4",
  measurementId: "G-YVBXCLNMD2",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
