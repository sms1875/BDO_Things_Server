import { initializeApp, FirebaseApp } from "firebase/app";
import {
    Firestore,
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    getDocs,
    query,
    where,
    updateDoc,
    deleteDoc,
    writeBatch,
    WriteBatch,
    DocumentReference,
    DocumentData
} from "firebase/firestore";
import config from "../config/config";

interface IFirebaseService {
    documentExists(collectionName: string, id: string): Promise<boolean>;
    addDocument<T extends DocumentData>(
        collectionName: string,
        data: T,
        id: string
    ): Promise<void>;
    getDocument<T extends DocumentData>(
        collectionName: string,
        id: string
    ): Promise<T | null>;
    updateDocument<T extends DocumentData>(
        collectionName: string,
        data: T,
        id: string
    ): Promise<void>;
    deleteDocument(collectionName: string, id: string): Promise<void>;
    getDocuments<T extends DocumentData>(collectionName: string): Promise<T[]>;
    getDocumentsWhere<T extends DocumentData>(
        collectionName: string,
        fieldName: string,
        fieldValue: unknown
    ): Promise<T[]>;
    createBatch(): WriteBatch;
    commitBatch(batch: WriteBatch): Promise<void>;
    doc(collectionName: string, id: string): DocumentReference;
}

class FirebaseService implements IFirebaseService {
    private app!: FirebaseApp;
    private db!: Firestore;

    constructor() {
        this.initializeFirebase();
    }

    private initializeFirebase(): void {
        this.app = initializeApp(config.firebaseConfig);
        this.db = getFirestore(this.app);
    }

    public async documentExists(
        collectionName: string,
        id: string
    ): Promise<boolean> {
        const docRef = doc(this.db, collectionName, id);
        const docSnapshot = await getDoc(docRef);
        return docSnapshot.exists();
    }

    public async addDocument<T extends DocumentData>(
        collectionName: string,
        data: T,
        id: string
    ): Promise<void> {
        const docRef = doc(this.db, collectionName, id);
        await setDoc(docRef, data);
    }

    public async getDocument<T extends DocumentData>(
        collectionName: string,
        id: string
    ): Promise<T | null> {
        const docRef = doc(this.db, collectionName, id);
        const docSnapshot = await getDoc(docRef);
        if (docSnapshot.exists()) {
            return docSnapshot.data() as T;
        }
        return null;
    }

    public async updateDocument<T extends DocumentData>(
        collectionName: string,
        data: T,
        id: string
    ): Promise<void> {
        const docRef = doc(this.db, collectionName, id);
        await updateDoc(docRef, data);
    }

    public async deleteDocument(
        collectionName: string,
        id: string
    ): Promise<void> {
        const docRef = doc(this.db, collectionName, id);
        await deleteDoc(docRef);
    }

    public async getDocuments<T extends DocumentData>(
        collectionName: string
    ): Promise<T[]> {
        const querySnapshot = await getDocs(
            collection(this.db, collectionName)
        );
        const documents: T[] = [];
        querySnapshot.forEach((doc) => {
            documents.push(doc.data() as T);
        });
        return documents;
    }

    public async getDocumentsWhere<T extends DocumentData>(
        collectionName: string,
        fieldName: string,
        fieldValue: unknown
    ): Promise<T[]> {
        const q = query(
            collection(this.db, collectionName),
            where(fieldName, "==", fieldValue)
        );
        const querySnapshot = await getDocs(q);
        const documents: T[] = [];
        querySnapshot.forEach((doc) => {
            documents.push(doc.data() as T);
        });
        return documents;
    }

    public createBatch(): WriteBatch {
        return writeBatch(this.db);
    }

    public async commitBatch(batch: WriteBatch): Promise<void> {
        await batch.commit();
    }

    public doc(collectionName: string, id: string): DocumentReference {
        return doc(this.db, collectionName, id);
    }
}

const firebaseService = new FirebaseService();

export default firebaseService;
