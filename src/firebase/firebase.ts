import { initializeApp, FirebaseApp } from 'firebase/app';
import { Firestore, getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import config from '../../config/config';

const firebase = {
  app: undefined as FirebaseApp | undefined, // Firebase 앱 인스턴스
  db: undefined as Firestore | undefined, // Firestore 인스턴스

  /**
   * Firebase를 초기화합니다.
   */
  initializeFirebase: function (): void {
    this.app = initializeApp(config.firebaseConfig); // Firebase 앱을 초기화합니다.
    this.db = getFirestore(this.app); // Firestore 인스턴스를 가져옵니다.
  },

  /**
   * Firestore 컬렉션에서 문서의 존재 여부를 확인합니다.
   * @param {string} collectionName - 컬렉션 이름
   * @param {string} id - 문서 ID
   * @returns {Promise<boolean>} - 문서의 존재 여부
   */
  documentExists: async function (collectionName: string, id: string): Promise<boolean> {
    try {
      const docRef = doc(this.db!, collectionName, id); // 문서 참조를 가져옵니다.
      const docSnapshot = await getDoc(docRef); // 문서 스냅샷을 가져옵니다.
      return docSnapshot.exists(); // 문서의 존재 여부를 반환합니다.
    } catch (error) {
      console.error(`Error checking document existence in collection ${collectionName}: `, error);
      return false;
    }
  },

  /**
   * Firestore 컬렉션에 문서를 추가합니다.
   * @param {string} collectionName - 컬렉션 이름
   * @param {any} data - 추가할 데이터
   * @param {string} id - 문서 ID
   */
  addDocument: async function (collectionName: string, data: any, id: string): Promise<void> {
    try {
      const docRef = doc(this.db!, collectionName, id); // 문서 참조를 가져옵니다.
      await setDoc(docRef, data); // 문서를 추가합니다.
      console.log(`Document written with ID ${id} in collection ${collectionName}`); // 성공 메시지를 출력합니다.
    } catch (error) {
      console.error(`Error adding document to collection ${collectionName}: `, error);
    }
  },
};

export default firebase;