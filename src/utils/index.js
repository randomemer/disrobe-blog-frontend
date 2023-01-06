import { Timestamp, updateDoc } from "firebase/firestore";

export function delay(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export function emailValidator(text) {
	const emailReg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w\w+)+$/;
	if (!emailReg.test(text)) {
		return "Not a valid email address";
	}
}

export function passwordValidator(text) {
	if (text.trim().length < 8) {
		return "Password too short";
	}
}

export function emptyValidator(text) {
	if (!text.trim()) {
		return "Field cannot be empty";
	}
}

export function createStoryContent(editor) {
	return {
		title: editor.title,
		content: JSON.stringify(editor.children),
		timestamp: Timestamp.now(),
	};
}

export async function publishStory(editor) {
	if (!editor.docRef) return;
	try {
		await updateDoc(editor.docRef, {
			is_published: true,
			"data.live": createStoryContent(editor),
		});
	} catch (error) {
		console.error(error);
	}
}
