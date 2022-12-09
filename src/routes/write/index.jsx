import AppHeader from "@/components/header";
import { findLinkInSelection } from "@/utils/editor-utils";
import { Fragment, useCallback, useMemo, useState } from "react";
import { createEditor } from "slate";
import { Slate, withReact } from "slate-react";
import { withHistory } from "slate-history";
import ArticleEditable from "@/components/article-editor";
import useSelection from "@/hooks/use-selection";
import ArticleToolbar from "@/components/article-toolbar";
import "./style.scss";

import sampleOne from "@/../references/sample-article-1";
import sampleTwo from "@/../references/kailash-article";

export default function Write(props) {
	const [content, updateContent] = useState(sampleTwo);
	const editor = useMemo(() => withHistory(withReact(createEditor())), []);
	const [selection, setSelectionOptimized] = useSelection(editor);

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
							type="text"
							name="article-title"
							placeholder="Title"
						/>
						<input
							className="form-input"
							type="text"
							name="article-subtitle"
							placeholder="Subtitle"
						/>
						<ArticleEditable />
					</main>
					<ArticleToolbar />
				</Slate>
			</div>
		</Fragment>
	);
}
