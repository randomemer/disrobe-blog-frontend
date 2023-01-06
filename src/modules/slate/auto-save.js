import { createStoryContent } from "@/utils";
import reduxStore from "@/modules/redux-store";
import {
	createStoryDraft,
	updateStoryDraft,
} from "@/modules/redux-store/slices/story-draft";

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
			const savedAt = reduxStore.getState().story_draft.savedAt;
			const now = Date.now();

			if (!savedAt || now - savedAt > 0) {
				reduxStore.dispatch({
					type: "story_draft/setSavedAt",
					payload: now + AUTO_SAVE_TIMEOUT,
				});
				setTimeout(() => saveStoryDraft(editor), AUTO_SAVE_TIMEOUT);
			}
		}
	};

	return editor;
}

export async function saveStoryDraft(editor) {
	const content = createStoryContent(editor);
	const state = reduxStore.getState();
	const doc = state.story_draft.id;

	if (!doc) {
		const res = await reduxStore.dispatch(createStoryDraft(content));

		if (!res.error) {
			// change url to appropriate story edit
			const url = `/story/${res.payload}/edit`;
			window.history.replaceState(null, "", url);
		}
	} else {
		reduxStore.dispatch(updateStoryDraft(content));
	}
}
