import AppHeader from "@/components/header";
import { findLinkInSelection } from "@/utils/editor-utils";
import { Fragment, useCallback, useMemo, useState, useRef } from "react";
import { createEditor } from "slate";
import { Slate, withReact } from "slate-react";
import { withHistory } from "slate-history";
import ArticleEditable from "@/components/article-editor";
import useSelection from "@/hooks/use-selection";
import ArticleToolbar from "@/components/article-toolbar";
import { withAutoSave } from "@/utils/article-auto-save";
import "./style.scss";

import sampleOne from "@/../references/sample-article-1";
// import sampleTwo from "@/../references/kailash-article";

export default function Write(props) {
	const [content, updateContent] = useState(sampleOne);
	const editor = useMemo(
		() => withAutoSave(withReact(withHistory(createEditor()))),
		[]
	);
	const [selection, setSelectionOptimized] = useSelection(editor);
	const titleInputRef = useRef(null);

	editor.titleInputRef = titleInputRef;

	const onChangeHandler = useCallback(
		(content) => {
			updateContent(content);
			findLinkInSelection(editor);
			setSelectionOptimized(selection);
		},
		[editor, updateContent, selection, setSelectionOptimized]
	);

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
