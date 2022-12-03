import { Fragment } from "react";
import { DefaultElement } from "slate-react";
import ArticleImage from "../article-image";

export function RenderElement(props) {
	const { attributes, element, children } = props;

	switch (element.type) {
		case "paragraph":
			return (
				<p className="editor-block" {...attributes}>
					{children}
				</p>
			);

		case "link":
			return (
				<a {...attributes} href={element.url} className="link">
					{children}
				</a>
			);

		case "bulleted-list":
			return (
				<ul className="editor-block" {...attributes}>
					{children}
				</ul>
			);

		case "numbered-list":
			return (
				<ol className="editor-block" {...attributes}>
					{children}
				</ol>
			);

		case "list-item":
			return <li {...attributes}>{children}</li>;

		case "image":
			return <ArticleImage {...props} />;

		case "h1":
			return (
				<h1 className="editor-block" {...attributes}>
					{children}
				</h1>
			);

		case "h2":
			return (
				<h2 className="editor-block" {...attributes}>
					{children}
				</h2>
			);

		case "h3":
			return (
				<h3 className="editor-block" {...attributes}>
					{children}
				</h3>
			);

		case "h4":
			return (
				<h4 className="editor-block" {...attributes}>
					{children}
				</h4>
			);

		case "h5":
			return (
				<h5 className="editor-block" {...attributes}>
					{children}
				</h5>
			);

		case "h6":
			return (
				<h6 className="editor-block" {...attributes}>
					{children}
				</h6>
			);

		default:
			return <DefaultElement {...attributes}>{children}</DefaultElement>;
	}
}

export function RenderLeaf({ attributes, children, leaf }) {
	let el = <Fragment>{children}</Fragment>;

	if (leaf.bold) {
		el = <strong>{el}</strong>;
	}

	if (leaf.code) {
		el = <code>{el}</code>;
	}

	if (leaf.italic) {
		el = <em>{el}</em>;
	}

	if (leaf.strikethrough) {
		el = <s>{el}</s>;
	}

	if (leaf.underline) {
		el = <u>{el}</u>;
	}

	return <span {...attributes}>{el}</span>;
}
