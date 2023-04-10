import admin from "@/modules/backend/admin";
import AuthorModel from "@/modules/backend/admin/models/author";

import type { AuthorDocumentData } from "@/types/backend/admin";

export default class AdminAuthorRepo {
  cache = new Map<string, AuthorModel>();

  async fetchId(id: string) {
    if (this.cache.has(id)) return this.cache.get(id)!;
    const firestore = admin.firestore();

    const docRef = firestore.doc(`authors/${id}`);
    const docSnap = await docRef.get();

    return new AuthorModel(docSnap.id, docSnap.data() as AuthorDocumentData);
  }

  async fetchMany(ids: string[]) {
    const firestore = admin.firestore();
    const authorCollection = firestore.collection("authors");

    const queryRef = authorCollection.where("__name__", "in", ids);
    const querySnap = await queryRef.get();

    return querySnap.docs.map(
      (doc) => new AuthorModel(doc.id, doc.data() as AuthorDocumentData)
    );
  }
}
