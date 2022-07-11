import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
 } from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAKm0UMW1Zb9qu5TMuSxtr-XkKK2_JtIvQ",
    authDomain: "crwn-clothing-db-eb0b4.firebaseapp.com",
    projectId: "crwn-clothing-db-eb0b4",
    storageBucket: "crwn-clothing-db-eb0b4.appspot.com",
    messagingSenderId: "863084302104",
    appId: "1:863084302104:web:d1f56265ea49cf48db586d"
  };
  
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore ();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) =>{
  if(!userAuth) return;
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if(!userSnapshot.exists()){ 
    const {displayName, email} = userAuth;
    const createAt = new Date();

    try{
      await setDoc(userDocRef, {displayName, email, createAt, ...additionalInformation});
    }catch(error){
      console.log("error creating the users", error.message);
    }
  }

  return userDocRef;

};

export const createAuthUserWithEmailAndPassword = async(email, password) =>{
    if(!email||!password) return;

    return await createUserWithEmailAndPassword(auth, email, password)
};

export const signInAuthUserWithEmailAndPassword = async(email, password) =>{
    if(!email||!password) return;

    return await signInWithEmailAndPassword(auth, email, password)
}