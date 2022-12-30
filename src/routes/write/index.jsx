import AppHeader from "@/components/header";
import ArticleEditable from "@/components/slate/article-editor";
import LinkEditor from "@/components/slate/link-editor";
import ArticleToolbar from "@/components/slate/toolbar";
import { useLinkNode } from "@/hooks/use-link-node";
// import withAutoSave from "@/modules/slate/auto-save";
import withInlines from "@/modules/slate/inlines";
import { DEFAULT_PARAGRAPH } from "@/modules/slate/layout";
import { withPlugins } from "@/utils/editor-utils";
import { Fragment, useMemo, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { createEditor } from "slate";
import { withHistory } from "slate-history";
import { Slate, useSlate, withReact } from "slate-react";
import "./style.scss";
import sample from "@/../references/kailash-article";

export default function Write() {
	const editor = useMemo(() => {
		return withPlugins(createEditor(), [
			withHistory,
			withReact,
			withInlines,
			// withAutoSave,
		]);
	}, []);
	const linkNode = useLinkNode(editor);
	let [title, content] = ["", [DEFAULT_PARAGRAPH]];
	content = sample;

	// get article data if given
	const loaderData = useLoaderData();
	const { article } = loaderData || {};

	if (article) {
		editor.docRef = article.ref;
		const draft = article.get("data.draft");
		title = draft.title;
		content = JSON.parse(draft.content);
		// content = sample;
	}

	return (
		<Fragment>
			<AppHeader />
			<div className="write-app">
				<Slate editor={editor} value={content}>
					<div className="article-container">
						<main className="article-area">
							<ArticleTitle initialValue={title} />
							<ArticleEditable />
							{linkNode ? <LinkEditor /> : null}
						</main>
					</div>
					<ArticleToolbar />
				</Slate>
			</div>
		</Fragment>
	);
}

function ArticleTitle({ initialValue }) {
	const editor = useSlate();
	const [title, setTitle] = useState(initialValue ?? "");
	editor.title = title;

	return (
		<input
			type="text"
			name="article-title"
			className="editor-block"
			placeholder="Title"
			value={title}
			onChange={(event) => setTitle(event.target.value)}
		/>
	);
}
