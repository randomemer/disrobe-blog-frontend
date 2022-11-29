import AppHeader from "@/components/header";
import { findLinkInSelection } from "@/utils/editor-utils";
import { Fragment, useCallback, useMemo, useState } from "react";
import { createEditor } from "slate";
import { Slate, withReact } from "slate-react";
import ArticleEditable from "@/components/article-editor";
import useSelection from "@/hooks/use-selection";
import ArticleToolbar from "@/components/article-toolbar";
import "./style.scss";

const example = [
	{
		type: "paragraph",
		children: [
			{ text: "A line of text in a paragraph." },
			{ text: " lol", bold: true },
			{ text: " lol", italic: true },
			{ text: " variableFoo", code: true },
		],
	},
	{
		type: "paragraph",
		children: [
			{
				type: "link",
				url: "https://www.google.com",
				children: [
					{ text: "Link text" },
					{ text: "Bold text inside link", bold: true },
				],
			},
		],
	},
	{
		type: "paragraph",
		children: [
			{
				text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
			},
		],
	},
];

export default function Write(props) {
	const [content, updateContent] = useState(example);
	const editor = useMemo(() => withReact(createEditor()), []);
	const [selection, setSelectionOptimized] = useSelection(editor);

	const onChangeHandler = useCallback(
		(content) => {
			updateContent(content);
			findLinkInSelection(editor);
			setSelectionOptimized(editor.selection);
		},
		[editor, updateContent, setSelectionOptimized]
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
