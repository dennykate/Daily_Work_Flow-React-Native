import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC6oBhWPITY-RY1IPfSV57AVoFhiYgk8tY",
  authDomain: "fir-uploadimage-48e55.firebaseapp.com",
  projectId: "fir-uploadimage-48e55",
  storageBucket: "fir-uploadimage-48e55.appspot.com",
  messagingSenderId: "304121635341",
  appId: "1:304121635341:web:3a96e83bde3d0ac572ab44",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
