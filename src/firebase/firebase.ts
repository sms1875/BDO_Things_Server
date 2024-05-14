import { initializeApp, FirebaseApp } from 'firebase/app';
import { Firestore, getFirestore, doc, setDoc } from 'firebase/firestore';
import config from '../../config/config';

// Firebase Initialization
let app: FirebaseApp;
let db: Firestore;

// Initialize Firebase
export function initializeFirebase(): void {
  app = initializeApp(config.firebaseConfig);
  db = getFirestore(app);
}

// Add document to Firestore collection
export async function addDocument(collectionName: string, data: any, id: string): Promise<void> {
  try {
    const docRef = doc(db, collectionName, id);
    await setDoc(docRef, data);
    console.log(`Document written with ID ${id} in collection ${collectionName}`);
  } catch (error) {
    console.error(`Error adding document to collection ${collectionName}: `, error);
  }
}