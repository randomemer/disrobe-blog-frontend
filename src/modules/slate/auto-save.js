import { auth, db } from "@/modules/firebase";
import { addDoc, collection, Timestamp, updateDoc } from "firebase/firestore";

const AUTO_SAVE_TIMEOUT = 5000;

export default function withAutoSave(editor) {
	const { onChange } = editor;

	editor.onChange = (content) => {
		// Call the default onChange handler
		onChange(content);

		const isAstChange = editor.operations.some(
			(op) => op.type !== "set_selection"
		);

		if (isAstChange) {
			const { savedAt } = editor;
			const now = Date.now();

			if (!savedAt || now - savedAt > 0) {
				setTimeout(() => saveArticleDraft(editor), AUTO_SAVE_TIMEOUT);
				editor.savedAt = now + AUTO_SAVE_TIMEOUT;
				console.log("will save after 5 secs");
			}
		}
	};

	return editor;
}

function createArticleContent(editor) {
	return {
		title: editor.title,
		content: JSON.stringify(editor.children),
		timestamp: Timestamp.now(),
	};
}

export async function saveArticleDraft(editor) {
	const articles = collection(db, "articles");
	try {
		const content = createArticleContent(editor);
		console.log("saving draft ...", content);
		if (!editor.docRef) {
			// create article in firestore
			editor.docRef = await addDoc(articles, {
				author: auth.currentUser.uid,
				is_published: false,
				data: {
					draft: content,
				},
				created_at: Timestamp.now(),
			});
			console.log(editor.docRef);

			// change url to appropriate article edit
			const url = `/story/${editor.docRef.id}/edit`;
			window.history.replaceState(null, "", url);
		} else {
			await updateDoc(editor.docRef, {
				"data.draft": content,
			});
		}
	} catch (error) {
		console.error(error);
	}
}
