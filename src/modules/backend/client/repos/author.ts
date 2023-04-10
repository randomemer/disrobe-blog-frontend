import { AuthorJSON } from "@/types/backend";
import { AuthorDocumentData } from "@/types/backend/client";
import {
  collection,
  CollectionReference,
  doc,
  documentId,
  Firestore,
  getDoc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import _ from "lodash";

// import type { IRepo } from "@/types/backend";
import AuthorModel from "../models/author";

export default class ClientAuthorRepo {
  cache = new Map<string, AuthorModel>();
  firestore: Firestore;
  authors: CollectionReference;

  constructor() {
    this.firestore = getFirestore();
    this.authors = collection(this.firestore, "authors");
  }

  async fetchId(id: string) {
    if (this.cache.has(id)) return this.cache.get(id)!;

    const firestore = getFirestore();
    const authors = collection(firestore, "authors");

    const docRef = doc(authors, id);
    const docSnap = await getDoc(docRef);

    return new AuthorModel(docSnap.id, docSnap.data() as AuthorDocumentData);
  }

  async fetchMany(ids: string[]) {
    const firestore = getFirestore();
    const authors = collection(firestore, "authors");
    const authorQueryRef = query(authors, where(documentId(), "in", ids));
    const authorQuerySnap = await getDocs(authorQueryRef);

    return authorQuerySnap.docs.map((doc) => {
      const author = new AuthorModel(doc.id, doc.data() as AuthorDocumentData);
      this.cache.set(doc.id, author);
      return author;
    });
  }

  async update(id: string, data: Omit<AuthorJSON, "id">) {
    const docRef = doc(this.authors, id);
    await updateDoc(docRef, data);
  }
}
