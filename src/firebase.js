import firebase from "firebase";

  const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAgOFQxjA-22qRVsrMmLeOYA8lZY95JGuc",
    authDomain: "instagram-9f8d1.firebaseapp.com",
    databaseURL: "https://instagram-9f8d1.firebaseio.com",
    projectId: "instagram-9f8d1",
    storageBucket: "instagram-9f8d1.appspot.com",
    messagingSenderId: "394487077849",
    appId: "1:394487077849:web:8898229a2785cbbeddd7c8",
    measurementId: "G-82NVVH29V1"
  });


  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();


  export{db, auth, storage};

  