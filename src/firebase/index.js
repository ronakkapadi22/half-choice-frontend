import { initializeApp } from "firebase/app";
import { getRemoteConfig, fetchAndActivate, getValue } from "firebase/remote-config";
import {
  getAuth,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDLzDWKrSq2yEHDazMMbI22yVd2_Gt_d2Y",
  authDomain: "halfchoice-61cbf.firebaseapp.com",
  projectId: "halfchoice-61cbf",
  storageBucket: "halfchoice-61cbf.appspot.com",
  messagingSenderId: "11170268887",
  appId: "1:11170268887:web:51836859029993ecb69292",
  measurementId: "G-TP1XSB6PWB"
};

// const firebaseConfig = {

//   apiKey: "AIzaSyCm9jnBYSweZYmlelDg8g38U1qYkDfAjss",
//   authDomain: "newsly-164bb.firebaseapp.com",
//   databaseURL: "https://newsly-164bb-default-rtdb.firebaseio.com",
//   projectId: "newsly-164bb",
//   storageBucket: "newsly-164bb.appspot.com",
//   messagingSenderId: "913260717277",
//   appId: "1:913260717277:web:6c733f70d337d647c8e734",
//   measurementId: "G-38YSEW8SNT"
// };

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);


// Initialize Remote Config
const remoteConfig = getRemoteConfig(app);

// Set default values and fetch settings
remoteConfig.settings = {
  minimumFetchIntervalMillis: 3600000, // Fetch interval (e.g., 1 hour)
};


export { auth, RecaptchaVerifier, signInWithPhoneNumber, remoteConfig, fetchAndActivate, getValue };

