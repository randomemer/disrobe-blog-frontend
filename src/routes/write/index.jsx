import AppHeader from "@/components/header";
import { findLinkInSelection, withPlugins } from "@/utils/editor-utils";
import { Fragment, useCallback, useMemo, useState, useRef } from "react";
import { createEditor } from "slate";
import { Slate, withReact } from "slate-react";
import { withHistory } from "slate-history";
import ArticleEditable from "@/components/article-editor";
import useSelection from "@/hooks/use-selection";
import ArticleToolbar from "@/components/article-toolbar";
import withAutoSave from "@/utils/article-auto-save";
import "./style.scss";

// import sampleOne from "@/../references/sample-article-1";
import { useLoaderData } from "react-router-dom";
import withLayout, { PARAGRAPH, TITLE } from "@/modules/article/layout";
// import sampleTwo from "@/../references/kailash-article";

export default function Write(props) {
	const editor = useMemo(() => {
		return withPlugins(createEditor(), [
			withHistory,
			withReact,
			withLayout,
			// withAutoSave,
		]);
	}, []);
	const [selection, setSelectionOptimized] = useSelection(editor);

	// get article data if given
	const loaderData = useLoaderData();
	const { article } = loaderData || {};

	// title input ref
	// TODO : use forced layout instead
	const titleInputRef = useRef(null);
	editor.titleInputRef = titleInputRef;

	let articeTitle = "";
	let articleContent = [TITLE, PARAGRAPH];
	if (article) {
		editor.docRef = article.ref;
		const draft = article.get("data.draft");
		articeTitle = article.get("title");
		articleContent = JSON.parse(draft.content);
	}

	const [title, setTitle] = useState(articeTitle);
	const [content, updateContent] = useState(articleContent);

	const onChangeHandler = useCallback(
		(content) => {
			updateContent(content);
			findLinkInSelection(editor);
			setSelectionOptimized(selection);
		},
		[editor, updateContent, selection, setSelectionOptimized]
	);

	const onTitleChange = () => setTitle(titleInputRef.current.value);

	return (
		<Fragment>
			<AppHeader />
			<div id="write-app">
				<Slate
					editor={editor}
					value={content}
					onChange={onChangeHandler}
				>
					<main className="article-area">
						<input
							className="form-input"
							ref={titleInputRef}
							type="text"
							name="article-title"
							value={title}
							onChange={onTitleChange}
							placeholder="Title"
						/>
						<ArticleEditable />
					</main>
					<ArticleToolbar />
				</Slate>
			</div>
		</Fragment>
	);
}
