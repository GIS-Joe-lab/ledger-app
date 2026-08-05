import { initializeApp } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { getFirestore, doc, setDoc, onSnapshot } from 'firebase/firestore';

// Safe to keep these values in the repo / client bundle — Firebase web
// config isn't a secret. Access is controlled by the Firestore security
// rules (see firestore.rules), not by hiding this object.
const firebaseConfig = {
  apiKey: "AIzaSyCNipvVPCoBNjChHWWoUB0e2Uvg0gidDcc",
  authDomain: "ledger-tracker-a0b15.firebaseapp.com",
  projectId: "ledger-tracker-a0b15",
  storageBucket: "ledger-tracker-a0b15.firebasestorage.app",
  messagingSenderId: "428980808813",
  appId: "1:428980808813:web:577f42434775a99b01a364",
  measurementId: "G-WX096X5J02",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut };

export function ledgerDocRef(uid) {
  return doc(db, 'users', uid, 'ledger', 'data');
}

export function subscribeLedger(uid, callback, onError) {
  return onSnapshot(ledgerDocRef(uid), (snap) => {
    callback(snap.exists() ? snap.data() : { entries: [], bankAccounts: [] });
  }, onError);
}

export async function saveLedgerPatch(uid, patch) {
  await setDoc(ledgerDocRef(uid), patch, { merge: true });
}
