import { auth, db } from "@/modules/firebase";
import {
  collection,
  documentId,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export default async function writeRouteLoader({ request, params }) {
  const docQuery = query(
    collection(db, "stories"),
    where(documentId(), "==", params.id),
    where("author", "==", auth.currentUser.uid)
  );
  const querySnap = await getDocs(docQuery);

  if (querySnap.empty) {
    throw new Response("", {
      status: 404,
      statusText: "Story doesn't exist",
    });
  }

  return { story: querySnap.docs[0].data() };
}
