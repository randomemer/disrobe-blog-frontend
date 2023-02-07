import { Fragment } from "react";
import { DefaultElement, useFocused, useSelected } from "slate-react";
import ArticleImage from "@/components/slate/image";
import classNames from "classnames";
import { Node } from "slate";

// Put this at the start and end of an inline component to work around this Chromium bug:
// https://bugs.chromium.org/p/chromium/issues/detail?id=1249405
function InlineChromiumBugfix() {
	return (
		<span contentEditable={false} style={{ fontSize: 0 }}>
			${String.fromCodePoint(160) /* Non-breaking space */}
		</span>
	);
}

const BLOCK_ELEMENTS = new Set([
	"paragraph",
	"blockquote",
	"bulleted-list",
	"numbered-list",
	"title",
	"h2",
	"h3",
	"h4",
	"h5",
	"h6",
]);

export function SlateElement(props) {
	const { attributes, element, children } = props;
	const isFocused = useFocused();
	const isSelected = useSelected();

	const classes = classNames({
		"editor-block": BLOCK_ELEMENTS.has(element.type),
		"editor-block--selected": isFocused && isSelected,
	});

	switch (element.type) {
		case "title":
			const titleText = Node.string(element);
			const titleClasses = classNames(classes, {
				"title-placeholder": titleText === "",
			});
			return (
				<h1 className={titleClasses} {...attributes}>
					{children}
				</h1>
			);

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
					<InlineChromiumBugfix />
					{children}
					<InlineChromiumBugfix />
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

export function SlateLeaf({ attributes, children, leaf }) {
	let el = <Fragment>{children}</Fragment>;

	// The following is a workaround for a Chromium bug where,
	// if you have an inline at the end of a block,
	// clicking the end of a block puts the cursor inside the inline
	// instead of inside the final {text: ''} node
	// https://github.com/ianstormtaylor/slate/issues/4704#issuecomment-1006696364
	const style = leaf.text ? { paddingRight: "0.001em" } : null;

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

	return (
		<span style={style} {...attributes}>
			{el}
		</span>
	);
}
