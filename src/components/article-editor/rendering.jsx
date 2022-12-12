import { Fragment } from "react";
import { DefaultElement, useFocused, useSelected } from "slate-react";
import ArticleImage from "@/components/article-image";
import classNames from "classnames";

const BLOCK_ELEMENTS = new Set([
	"paragraph",
	"blockquote",
	"bulleted-list",
	"numbered-list",
	"h1",
	"h2",
	"h3",
	"h4",
	"h5",
	"h6",
]);

export function RenderElement(props) {
	const { attributes, element, children } = props;
	const isFocused = useFocused();
	const isSelected = useSelected();

	const classes = classNames({
		"editor-block": BLOCK_ELEMENTS.has(element.type),
		"editor-block--selected": isFocused && isSelected,
	});

	switch (element.type) {
		case "paragraph":
			return (
				<p {...attributes} className={classes}>
					{children}
				</p>
			);

		case "blockquote":
			return (
				<blockquote {...attributes} className={classes}>
					{children}
				</blockquote>
			);

		case "link":
			return (
				<a {...attributes} href={element.url} className="link">
					{children}
				</a>
			);

		case "bulleted-list":
			return (
				<ul className={classes} {...attributes}>
					{children}
				</ul>
			);

		case "numbered-list":
			return (
				<ol className={classes} {...attributes}>
					{children}
				</ol>
			);

		case "list-item":
			return <li {...attributes}>{children}</li>;

		case "image":
			return <ArticleImage {...props} />;

		case "title":
			return (
				<h1 dataPlaceholder="Title" className={classes} {...attributes}>
					{children}
				</h1>
			);

		case "h2":
			return (
				<h2 className={classes} {...attributes}>
					{children}
				</h2>
			);

		case "h3":
			return (
				<h3 className={classes} {...attributes}>
					{children}
				</h3>
			);

		case "h4":
			return (
				<h4 className={classes} {...attributes}>
					{children}
				</h4>
			);

		case "h5":
			return (
				<h5 className={classes} {...attributes}>
					{children}
				</h5>
			);

		case "h6":
			return (
				<h6 className={classes} {...attributes}>
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
