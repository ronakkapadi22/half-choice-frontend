import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from "firebase/auth";

// const firebaseConfig = {
//     apiKey: "AIzaSyDLzDWKrSq2yEHDazMMbI22yVd2_Gt_d2Y",
//     authDomain: "halfchoice-61cbf.firebaseapp.com",
//     projectId: "halfchoice-61cbf",
//     storageBucket: "halfchoice-61cbf.appspot.com",
//     messagingSenderId: "11170268887",
//     appId: "1:11170268887:web:51836859029993ecb69292",
//     measurementId: "G-TP1XSB6PWB"
// };

const firebaseConfig = {
<<<<<<< HEAD
  apiKey: "AIzaSyDLzDWKrSq2yEHDazMMbI22yVd2_Gt_d2Y",
  authDomain: "halfchoice-61cbf.firebaseapp.com",
  projectId: "halfchoice-61cbf",
  storageBucket: "halfchoice-61cbf.appspot.com",
  messagingSenderId: "11170268887",
  appId: "1:11170268887:web:51836859029993ecb69292",
  measurementId: "G-TP1XSB6PWB",
};
=======
    apiKey: "AIzaSyCm9jnBYSweZYmlelDg8g38U1qYkDfAjss",
    authDomain: "newsly-164bb.firebaseapp.com",
    databaseURL: "https://newsly-164bb-default-rtdb.firebaseio.com",
    projectId: "newsly-164bb",
    storageBucket: "newsly-164bb.appspot.com",
    messagingSenderId: "913260717277",
    appId: "1:913260717277:web:6c733f70d337d647c8e734",
    measurementId: "G-38YSEW8SNT"
  };
>>>>>>> 26b7274abe08c8808ba0e85b3aec95c0801d2909

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

<<<<<<< HEAD
const signInPhoneNumber = (data, verifier) => {
  signInWithPhoneNumber(data, verifier)
    .then((confirmationResult) => {
      window.confirmationResult = confirmationResult;
      console.log("OTP has been send");
      return true;
    })
    .catch((error) => {
      console.log("error :", error?.message);
      return false;
    });
};

export { auth, RecaptchaVerifier, signInPhoneNumber };
=======

export { auth, RecaptchaVerifier, signInWithPhoneNumber };
>>>>>>> 26b7274abe08c8808ba0e85b3aec95c0801d2909
