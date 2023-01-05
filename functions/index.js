import functions from "firebase-functions";
import admin from "firebase-admin";

admin.initializeApp();

export const cleanStoryImages = functions
	.region("asia-south1")
	.pubsub.schedule("* * * * 0")
	.onRun(async () => {
		const firestore = admin.firestore();
		const bucket = admin.storage().bucket();

		const collection = await firestore.collection("stories").get();

		collection.docs.forEach(async (doc) => {});
	});
