import {
  Firestore,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

class FirebaseApi {
  private _db: Firestore;

  constructor(db: Firestore) {
    this._db = db;
  }

  async createData(collectionName: string, payload: any) {
    try {
      const docRef = await addDoc(
        collection(this._db, collectionName),
        payload
      );
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async readData(collectionName: string) {
    const querySnapshot = await getDocs(collection(this._db, collectionName));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
    });
  }

  async updateData(docId: string, collectionName: string, payload: any) {
    const docRef = doc(this._db, collectionName, docId);
    await updateDoc(docRef, payload);
  }

  async deleteData(docId: string, collectionName: string) {
    await deleteDoc(doc(this._db, "your_collection_name", docId));
  }
}

export const firebaseApi = new FirebaseApi(db);
