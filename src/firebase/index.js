import { initializeApp } from 'firebase/app'
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDLzDWKrSq2yEHDazMMbI22yVd2_Gt_d2Y",
    authDomain: "halfchoice-61cbf.firebaseapp.com",
    projectId: "halfchoice-61cbf",
    storageBucket: "halfchoice-61cbf.appspot.com",
    messagingSenderId: "11170268887",
    appId: "1:11170268887:web:51836859029993ecb69292",
    measurementId: "G-TP1XSB6PWB"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


const signInPhoneNumber = (data,verifier) => {
    signInWithPhoneNumber(data, verifier)
    .then((confirmationResult)=>{
        window.confirmationResult = confirmationResult;
        console.log('OTP has been send');
        return true;
    })
    .catch((error) => {
        console.log('error :', error?.message)
        return false;
    })
}

export { auth, RecaptchaVerifier, signInPhoneNumber };