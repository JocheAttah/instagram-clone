import firebase from "firebase";

  const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAVfXzkICuhpPh04sRKUhHIXOkuPbA_USE",
    authDomain: "instagram-clone-react-ea238.firebaseapp.com",
    databaseURL: "https://instagram-clone-react-ea238.firebaseio.com",
    projectId: "instagram-clone-react-ea238",
    storageBucket: "instagram-clone-react-ea238.appspot.com",
    messagingSenderId: "334953082411",
    appId: "1:334953082411:web:3042ffd7133808bbf7046e",
    measurementId: "G-GLL5YVLNDT"
  });


  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();


  export{db, auth, storage};