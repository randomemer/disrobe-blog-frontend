import {
  addDoc,
  collection,
  doc,
  documentId,
  getDocs,
  getFirestore,
  limit,
  query,
  setDoc,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import ClientAuthorRepo from "./author";
import StoryModel from "@/modules/backend/client/models/story";
import AuthorModel from "@/modules/backend/client/models/author";

// import { IRepo } from "@/types/backend";
import type { StoryDocumentData } from "@/types/backend/client";
import type { StoryDraftInput } from "@/types/backend";

export default class StoryRepository {
  async fetchMany() {
    const firestore = getFirestore();
    const stories = collection(firestore, "stories");

    const queryRef = query(
      stories,
      limit(25)
      // where("is_published", "==", true)
    );
    const querySnap = await getDocs(queryRef);

    const authorIds = new Set<string>();

    querySnap.docs.forEach((doc) => {
      const id = doc.data().authorId;
      authorIds.add(id);
    });

    const authors = await new ClientAuthorRepo().fetchMany(
      Array.from(authorIds)
    );
    const authorsMap = new Map(authors.map((a) => [a.id, a]));

    return querySnap.docs.map((doc) => {
      const story = doc.data() as StoryDocumentData;
      const author = authorsMap.get(story.author)!;
      return new StoryModel(doc.id, story, author);
    });
  }

  async fetchId(id: string) {
    const firestore = getFirestore();
    const stories = collection(firestore, "stories");

    const queryRef = query(
      stories,
      where(documentId(), "==", id)
      // where("is_published", "==", true)
    );

    const querySnap = await getDocs(queryRef);

    if (!querySnap || querySnap.empty) return undefined;

    const story = querySnap.docs[0].data() as StoryDocumentData;
    const author = await new ClientAuthorRepo().fetchId(story.author);

    return new StoryModel(querySnap.docs[0].id, story, author);
  }

  async createNewDraft(draft: StoryDraftInput, author: AuthorModel) {
    const firestore = getFirestore();
    const stories = collection(firestore, "stories");

    const docData: StoryDocumentData = {
      author: author.id,
      created_at: Timestamp.now(),
      is_published: false,
      data: {
        draft: {
          title: draft.title,
          content: JSON.stringify(draft.content),
          timestamp: Timestamp.now(),
        },
      },
    };

    const snapshot = await addDoc(stories, docData);

    return new StoryModel(snapshot.id, docData, author);
  }

  async update(story: StoryModel) {
    const firestore = getFirestore();
    const stories = collection(firestore, "stories");

    const docRef = doc(stories, story.id);
    await updateDoc(docRef, story.toDocument());

    return story;
  }
}

export const clientStoryRepo = new StoryRepository();
