import { createArticleContent } from "@/utils";
import reduxStore from "@/modules/redux-store";
import {
	createArticleDraft,
	updateArticleDraft,
} from "@/modules/redux-store/slices/article-draft";

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
			const savedAt = reduxStore.getState().article_draft.savedAt;
			const now = Date.now();

			if (!savedAt || now - savedAt > 0) {
				reduxStore.dispatch({
					type: "article_draft/setSavedAt",
					payload: now + AUTO_SAVE_TIMEOUT,
				});
				setTimeout(() => saveArticleDraft(editor), AUTO_SAVE_TIMEOUT);
			}
		}
	};

	return editor;
}

export async function saveArticleDraft(editor) {
	const content = createArticleContent(editor);
	const state = reduxStore.getState();
	const doc = state.article_draft.id;

	if (!doc) {
		const res = await reduxStore.dispatch(createArticleDraft(content));

		if (!res.error) {
			// change url to appropriate article edit
			const url = `/story/${res.payload}/edit`;
			window.history.replaceState(null, "", url);
		}
	} else {
		reduxStore.dispatch(updateArticleDraft(content));
	}
}
