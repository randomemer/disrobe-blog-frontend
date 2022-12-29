import ArticleEditable from "@/components/slate/article-editor";
import ArticleToolbar from "@/components/slate/toolbar";
import AppHeader from "@/components/header";
import { withPlugins } from "@/utils/editor-utils";
import { Fragment, useMemo } from "react";
import { createEditor } from "slate";
import { withHistory } from "slate-history";
import { Slate, withReact } from "slate-react";
// import withAutoSave from "@/modules/article/auto-save";
import LinkEditor from "@/components/slate/link-editor";
import { useLinkNode } from "@/hooks/use-link-node";
import withInlines from "@/modules/slate/inlines";
import withLayout, {
	DEFAULT_PARAGRAPH,
	DEFAULT_TITLE,
} from "@/modules/slate/layout";
import { useLoaderData } from "react-router-dom";
import "./style.scss";

import sample from "@/../references/sample-article-1";
// import sample from "@/../references/kailash-article";

export default function Write() {
	const editor = useMemo(() => {
		return withPlugins(createEditor(), [
			withHistory,
			withReact,
			withInlines,
			withLayout,
			// withAutoSave,
		]);
	}, []);

	const linkNode = useLinkNode(editor);

	// get article data if given
	const loaderData = useLoaderData();
	const { article } = loaderData || {};

	let articleContent = [DEFAULT_TITLE, DEFAULT_PARAGRAPH];
	if (article) {
		editor.docRef = article.ref;
		const draft = article.get("data.draft");
		articleContent = JSON.parse(draft.content);
	}

	const content = sample;

	return (
		<Fragment>
			<AppHeader />
			<div id="write-app">
				<Slate editor={editor} value={content}>
					<main className="article-area">
						<ArticleEditable />
					</main>
					<ArticleToolbar />
					{linkNode ? <LinkEditor /> : null}
				</Slate>
			</div>
		</Fragment>
	);
}
