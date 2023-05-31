import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCMu1DlGYSmm8VawC2cX3pObM2DHPVVqSs",
  authDomain: "signature-verification-a3fb2.firebaseapp.com",
  projectId: "signature-verification-a3fb2",
  storageBucket: "signature-verification-a3fb2.appspot.com",
  messagingSenderId: "902400482906",
  appId: "1:902400482906:web:6f41e513578fbf244ec263",
  measurementId: "G-4CPEMMR9S8",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { app, auth };
