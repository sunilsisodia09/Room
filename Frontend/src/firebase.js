import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDwnpT6SEay3sxcVFBdKGHa1zOnQFiqXE4",
  authDomain: "gymhealth-cd249.firebaseapp.com",
  projectId: "gymhealth-cd249",
  storageBucket: "gymhealth-cd249.appspot.com",
  messagingSenderId: "899873533682",
  appId: "1:899873533682:web:bbdaf734f87f0192d2ea6b",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();
provider.addScope("email");
provider.addScope("profile");