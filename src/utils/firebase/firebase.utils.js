import { async } from '@firebase/util';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc} from 'firebase/firestore';
import { useResolvedPath } from 'react-router-dom';

const firebaseConfig = {
    apiKey: "AIzaSyAKm0UMW1Zb9qu5TMuSxtr-XkKK2_JtIvQ",
    authDomain: "crwn-clothing-db-eb0b4.firebaseapp.com",
    projectId: "crwn-clothing-db-eb0b4",
    storageBucket: "crwn-clothing-db-eb0b4.appspot.com",
    messagingSenderId: "863084302104",
    appId: "1:863084302104:web:d1f56265ea49cf48db586d"
  };
  
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore ();

export const createUserDocumentFromAuth = async (userAuth) =>{
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if(!userSnapshot.exists()){ 
    const {displayName, email} = userAuth;
    const createAt = new Date();

    try{
      await setDoc(userDocRef, {displayName, email, createAt});
    }catch(error){
      console.log("error creating the users", error.message);
    }
  }

  return userDocRef;

}