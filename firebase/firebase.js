var firebase = require('firebase');

var firebaseConfig = {
    apiKey: "AIzaSyCXuUIBVwdLeXg_i3HrUXa2arDYMj3J0n4",
    authDomain: "lora-6bc74.firebaseapp.com",
    databaseURL: "https://lora-6bc74-default-rtdb.firebaseio.com",
    projectId: "lora-6bc74",
    storageBucket: "lora-6bc74.appspot.com",
    messagingSenderId: "209619326620",
    appId: "1:209619326620:web:3b871bbdb78b6edf287f59",
    measurementId: "G-87KRY41CL3"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  let database = firebase.database().ref("test");
  database.set({
      a:{
          number:1
      }
  })
 