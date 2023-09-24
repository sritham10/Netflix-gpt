// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_P4acTFD0Xs_eYB2nLtblKLyEd0Nm9uY",
  authDomain: "netflixxgpt.firebaseapp.com",
  projectId: "netflixxgpt",
  storageBucket: "netflixxgpt.appspot.com",
  messagingSenderId: "303761339027",
  appId: "1:303761339027:web:086d780ba055ba15cc9366",
  measurementId: "G-BFHDKV1VKJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
 export const auth = getAuth();