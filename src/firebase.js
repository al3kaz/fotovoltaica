import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyC8e7J4VL36BY4opjVPLu1TCFei5f2iA2U',
  authDomain: 'voltspot-aa420.firebaseapp.com',
  databaseURL: 'https://voltspot-aa420.firebaseio.com',
  projectId: 'voltspot-aa420',
  storageBucket: 'voltspot-aa420.appspot.com',
  messagingSenderId: '735504612299',
  appId: '1:735504612299:web:ee8e81f1957902555b944e',
  measurementId: 'G-TE721J1MS6',
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;
  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const { email, displayName, photoURL } = user;
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        ...additionalData,
      });
    } catch (error) {
      console.error('Error creating user document', error);
    }
  }
  return getUserDocument(user.uid);
};
const getUserDocument = async (uid) => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();
    return {
      uid,
      ...userDocument.data(),
    };
  } catch (error) {
    console.error('Error fetching user', error);
  }
};
