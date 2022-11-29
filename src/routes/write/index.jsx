import { Fragment, useMemo, useCallback, useState } from "react";
import AppHeader from "@/components/header";
import "./style.scss";
import { Slate, withReact } from "slate-react";
import ArticleEditable from "./article-editor";
import ArticleToolbar from "./article-toolbar";
import { createEditor } from "slate";
import useSelection from "./article-editor/modules/use-selection";

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
		type: "h1",
		children: [{ text: "Heading 1" }],
	},
	{
		type: "h2",
		children: [{ text: "Heading 2" }],
	},
];

export default function Write(props) {
	const [content, updateContent] = useState(example);
	const editor = useMemo(() => withReact(createEditor()), []);
	const [selection, setSelectionOptimized] = useSelection(editor);

	const onChangeHandler = useCallback(
		(content) => {
			updateContent(content);
			setSelectionOptimized(editor.selection);
		},
		[editor.selection, updateContent, setSelectionOptimized]
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
