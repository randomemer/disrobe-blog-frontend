import { Fragment } from "react";
import { DefaultElement } from "slate-react";
import ArticleImage from "../article-image";

export function RenderElement(props) {
	const { attributes, element, children } = props;

	switch (element.type) {
		case "paragraph":
			return (
				<p className="paragraph" {...attributes}>
					{children}
				</p>
			);

		case "link":
			return (
				<a {...attributes} href={element.url} className="link">
					{children}
				</a>
			);

		case "image":
			return <ArticleImage {...props} />;

		case "h1":
			return <h1 {...attributes}>{children}</h1>;

		case "h2":
			return <h2 {...attributes}>{children}</h2>;

		case "h3":
			return <h3 {...attributes}>{children}</h3>;

		case "h4":
			return <h4 {...attributes}>{children}</h4>;

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

	if (leaf.underline) {
		el = <u>{el}</u>;
	}

	return <span {...attributes}>{el}</span>;
}
