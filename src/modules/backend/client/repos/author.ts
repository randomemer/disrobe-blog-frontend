import { AuthorDocumentData } from "@/types/backend/client";
import {
  collection,
  doc,
  documentId,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";

// import type { IRepo } from "@/types/backend";
import AuthorModel from "../models/author";

export default class ClientAuthorRepo {
  cache = new Map<string, AuthorModel>();

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
}
