import { db } from "@/modules/firebase";
import {
  collection,
  doc,
  documentId,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export default async function storyRouteLoader({ request, params }) {
  const docQuery = query(
    collection(db, "stories"),
    where(documentId(), "==", params.id)
    // TODO :
    // where("is_published", "==", true)
  );
  const querySnap = await getDocs(docQuery);

  if (!querySnap || querySnap.empty) {
    throw new Response("", {
      status: 404,
      statusText: "Story doesn't exist",
    });
  }

  // Start loading the article

  const story = querySnap.docs[0].data();
  const { title } = story.data.draft;
  document.title = `${title} | Disrobe`;

  const authorDocRef = doc(db, "authors", story.author);
  const authorDocSnap = await getDoc(authorDocRef);
  const author = authorDocSnap.data();

  return { story, author };
}
