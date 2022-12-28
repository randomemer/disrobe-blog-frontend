import ArticleEditable from "@/components/article-editor";
import ArticleToolbar from "@/components/article-toolbar";
import AppHeader from "@/components/header";
import useSelection from "@/hooks/use-selection";
import { withPlugins } from "@/utils/editor-utils";
import { Fragment, useCallback, useMemo, useState } from "react";
import { createEditor } from "slate";
import { withHistory } from "slate-history";
import { Slate, withReact } from "slate-react";
// import withAutoSave from "@/modules/article/auto-save";
import withInlines from "@/modules/article/inlines";
import withLayout, {
	DEFAULT_PARAGRAPH,
	DEFAULT_TITLE,
} from "@/modules/article/layout";
import { useLoaderData } from "react-router-dom";
import "./style.scss";

import sample from "@/../references/sample-article-1";
// import sample from "@/../references/kailash-article";

export default function Write(props) {
	const editor = useMemo(() => {
		return withPlugins(createEditor(), [
			withHistory,
			withReact,
			withInlines,
			withLayout,
			// withAutoSave,
		]);
	}, []);
	const [selection, setSelectionOptimized] = useSelection(editor);

	// get article data if given
	const loaderData = useLoaderData();
	const { article } = loaderData || {};

	let articleContent = [DEFAULT_TITLE, DEFAULT_PARAGRAPH];
	if (article) {
		editor.docRef = article.ref;
		const draft = article.get("data.draft");
		articleContent = JSON.parse(draft.content);
	}

	const [content, updateContent] = useState(sample);

	const onChangeHandler = useCallback(
		(content) => {
			updateContent(content);
			setSelectionOptimized(selection);
		},
		[updateContent, setSelectionOptimized, selection]
	);

	return (
		<Fragment>
			<AppHeader />
			<div id="write-app">
				<Slate editor={editor} value={content} onChange={onChangeHandler}>
					<main className="article-area">
						<ArticleEditable />
					</main>
					<ArticleToolbar />
				</Slate>
			</div>
		</Fragment>
	);
}
