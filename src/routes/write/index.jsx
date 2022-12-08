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

const example = [
	{
		type: "paragraph",
		children: [
			{ text: "A line of text in a paragraph.\n" },
			{ text: "bold\n", bold: true },
			{ text: "italic\n", italic: true },
			{ text: "strikethrough\n", strikethrough: true },
			{ text: "underlined\n", underline: true },
			{ text: "variableFoo\n", code: true },
			{
				type: "link",
				url: "https://www.slatejs.org/examples/images",
				children: [
					{ text: "Link text. " },
					{ text: "Bold text inside link", bold: true },
				],
			},
		],
	},
	{
		type: "image",
		url: "https://images2.alphacoders.com/870/thumb-1920-870886.jpg",
		caption: "A still from BladeRunner 2049",
		children: [{ text: "" }],
	},
	{
		type: "paragraph",
		children: [
			{
				text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ",
			},
			{
				type: "link",
				url: "https://www.smashingmagazine.com/2021/05/building-wysiwyg-editor-javascript-slatejs/",
				children: [
					{
						text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
					},
				],
			},
			{
				text: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
			},
		],
	},
];

export default function Write(props) {
	const [content, updateContent] = useState(example);
	const editor = useMemo(() => withHistory(withReact(createEditor())), []);
	const [selection, setSelectionOptimized] = useSelection(editor);

	const onChangeHandler = useCallback(
		(content) => {
			updateContent(content);
			findLinkInSelection(editor);
			setSelectionOptimized(selection);
			console.log(content);
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
