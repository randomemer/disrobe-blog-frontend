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
		const images = new Set();

		for (const doc of collection.docs) {
			let draft = await doc.get("data.draft.content");
			draft = JSON.parse(draft);
			for (const element of draft) {
				if (element.type === "image" && element.source_type === "backend") {
					images.add(element.bucket_path);
				}
			}
		}

		const [files] = await bucket.getFiles({
			prefix: "images/stories/",
			delimiter: "/",
		});

		for (const file of files) {
			if (
				file.metadata.contentType.startsWith("image") &&
				!images.has(file.name)
			) {
				await file.delete();
				functions.logger.log("deleted file :", file.name);
			}
		}
	});
