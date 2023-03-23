import admin from "@/modules/backend/admin";
import AdminAuthorRepo from "./author";
import StoryModel from "@/modules/backend/admin/models/story";
import { StoryDocumentData } from "@/types/backend/admin";
// import { IRepo } from "@/types/backend/admin";

export default class AdminStoryRepo {
  async fetchFeed() {
    const firestore = admin.firestore();
    const storyCollection = firestore.collection("stories");

    // fetch the stories as per options
    const queryRef = storyCollection.limit(25);
    // where("is_published", "==", true)
    const querySnap = await queryRef.get();

    // make a list of authors which dont exist
    const authorIds = new Set<string>();

    querySnap.docs.forEach((doc) => {
      const id = doc.data().author;
      authorIds.add(id);
    });

    const authors = await new AdminAuthorRepo().fetchMany(
      Array.from(authorIds)
    );

    const authorsMap = new Map(authors.map((a) => [a.id, a]));

    return querySnap.docs.map((doc) => {
      return new StoryModel(
        doc.id,
        doc.data() as StoryDocumentData,
        authorsMap.get(doc.data().author)!
      );
    });
  }

  async fetchId(id: string) {
    const firestore = admin.firestore();
    const storyCollection = firestore.collection("stories");

    const queryRef = storyCollection.where("__name__", "==", id);
    // .where("is_published", "==", true);
    const querySnap = await queryRef.get();

    if (!querySnap || querySnap.empty) return undefined;

    const story = querySnap.docs[0].data() as StoryDocumentData;
    const author = await new AdminAuthorRepo().fetchId(story.author);

    return new StoryModel(querySnap.docs[0].id, story, author);
  }
}
