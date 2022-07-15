import { async } from '@firebase/util';
import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
 } from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs} from 'firebase/firestore';

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

export const addCollectionAndDocuments = async(collectionKey, objectsToADD,field) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToADD.forEach((object)=>{
    const docRef = doc(collectionRef,object.title.toLowerCase());
    batch.set(docRef, object);
  });
  await batch.commit();
  console.log('done');
};

export const getCategoriesAndDocuments = async()=>{
  const collectionRef = collection(db,'categories');
  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc,docSnapshot)=>{
    const {title,items} = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  },{});
  return categoryMap
}

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
};

export const signOutUser = async() => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);