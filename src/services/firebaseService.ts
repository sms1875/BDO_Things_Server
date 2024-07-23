import { initializeApp } from "firebase-admin/app";
import {
    getFirestore,
    Firestore,
    DocumentReference,
    DocumentData,
    WriteBatch
} from "firebase-admin/firestore";
import { credential } from "firebase-admin";
import logger from "../config/logger"; // 로그 모듈 임포트
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
    private db!: Firestore;

    constructor() {
        this.initializeFirebase();
    }

    private initializeFirebase(): void {
        logger.info(
            "Initializing Firebase with application default credentials"
        ); // 로그 메시지 구체화
        try {
            initializeApp({
                credential: credential.cert(config.serviceAccount)
            });
            this.db = getFirestore();
            logger.info("Firebase initialized successfully");
        } catch (error) {
            logger.error("Error initializing Firebase", error);
            throw error;
        }
    }

    public async documentExists(
        collectionName: string,
        id: string
    ): Promise<boolean> {
        logger.info(`Checking if document exists: ${collectionName}/${id}`);
        try {
            const docRef = this.db.collection(collectionName).doc(id);
            const docSnapshot = await docRef.get();
            return docSnapshot.exists;
        } catch (error) {
            logger.error(
                `Error checking document existence: ${collectionName}/${id}`,
                error
            );
            throw error;
        }
    }

    public async addDocument<T extends DocumentData>(
        collectionName: string,
        data: T,
        id: string
    ): Promise<void> {
        logger.info(`Adding document: ${collectionName}/${id}`);
        try {
            const docRef = this.db.collection(collectionName).doc(id);
            await docRef.set(data);
            logger.info(`Document added successfully: ${collectionName}/${id}`);
        } catch (error) {
            logger.error(
                `Error adding document: ${collectionName}/${id}`,
                error
            );
            throw error;
        }
    }

    public async getDocument<T extends DocumentData>(
        collectionName: string,
        id: string
    ): Promise<T | null> {
        logger.info(`Getting document: ${collectionName}/${id}`);
        try {
            const docRef = this.db.collection(collectionName).doc(id);
            const docSnapshot = await docRef.get();
            if (docSnapshot.exists) {
                return docSnapshot.data() as T;
            }
            return null;
        } catch (error) {
            logger.error(
                `Error getting document: ${collectionName}/${id}`,
                error
            );
            throw error;
        }
    }

    public async updateDocument<T extends DocumentData>(
        collectionName: string,
        data: T,
        id: string
    ): Promise<void> {
        logger.info(`Updating document: ${collectionName}/${id}`);
        try {
            const docRef = this.db.collection(collectionName).doc(id);
            await docRef.update(data);
            logger.info(
                `Document updated successfully: ${collectionName}/${id}`
            );
        } catch (error) {
            logger.error(
                `Error updating document: ${collectionName}/${id}`,
                error
            );
            throw error;
        }
    }

    public async deleteDocument(
        collectionName: string,
        id: string
    ): Promise<void> {
        logger.info(`Deleting document: ${collectionName}/${id}`);
        try {
            const docRef = this.db.collection(collectionName).doc(id);
            await docRef.delete();
            logger.info(
                `Document deleted successfully: ${collectionName}/${id}`
            );
        } catch (error) {
            logger.error(
                `Error deleting document: ${collectionName}/${id}`,
                error
            );
            throw error;
        }
    }

    public async getDocuments<T extends DocumentData>(
        collectionName: string
    ): Promise<T[]> {
        logger.info(`Getting documents from collection: ${collectionName}`);
        try {
            const querySnapshot = await this.db
                .collection(collectionName)
                .get();
            const documents: T[] = [];
            querySnapshot.forEach((doc) => {
                documents.push(doc.data() as T);
            });
            return documents;
        } catch (error) {
            logger.error(
                `Error getting documents from collection: ${collectionName}`,
                error
            );
            throw error;
        }
    }

    public async getDocumentsWhere<T extends DocumentData>(
        collectionName: string,
        fieldName: string,
        fieldValue: unknown
    ): Promise<T[]> {
        logger.info(
            `Getting documents where ${fieldName}=${fieldValue} from collection: ${collectionName}`
        );
        try {
            const querySnapshot = await this.db
                .collection(collectionName)
                .where(fieldName, "==", fieldValue)
                .get();
            const documents: T[] = [];
            querySnapshot.forEach((doc) => {
                documents.push(doc.data() as T);
            });
            return documents;
        } catch (error) {
            logger.error(
                `Error getting documents where ${fieldName}=${fieldValue} from collection: ${collectionName}`,
                error
            );
            throw error;
        }
    }

    public createBatch(): WriteBatch {
        logger.info("Creating batch");
        return this.db.batch();
    }

    public async commitBatch(batch: WriteBatch): Promise<void> {
        logger.info("Committing batch");
        try {
            await batch.commit();
            logger.info("Batch committed successfully");
        } catch (error) {
            logger.error("Error committing batch", error);
            throw error;
        }
    }

    public doc(collectionName: string, id: string): DocumentReference {
        logger.info(`Getting document reference: ${collectionName}/${id}`);
        return this.db.collection(collectionName).doc(id);
    }
}

const firebaseService = new FirebaseService();

export default firebaseService;
