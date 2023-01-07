import { Text } from "slate";
import { Fragment } from "react";

export function serializeToHTML(content) {
	return (
		<Fragment>
			{content.map((element, index) => (
				<HTMLElement key={index} node={element} />
			))}
		</Fragment>
	);
}

const HTMLElement = ({ node }) => {
	if (Text.isText(node)) {
		let leaf = <Fragment>{node.text}</Fragment>;
		if (node.bold) {
			leaf = <strong>{leaf}</strong>;
		}
		if (node.italic) {
			leaf = <em>{leaf}</em>;
		}
		if (node.strikethrough) {
			leaf = <s>{leaf}</s>;
		}
		if (node.underline) {
			leaf = <u>{leaf}</u>;
		}
		if (node.code) {
			leaf = <code>{leaf}</code>;
		}
		return leaf;
	}

	const children = node.children.map((n, i) => (
		<HTMLElement key={i} node={n} />
	));

	switch (node.type) {
		case "paragraph":
			return <p>{children}</p>;

		case "image":
			return (
				<figure>
					<img src={node.url} alt={node.alt} />
					<figcaption>{node.caption}</figcaption>
				</figure>
			);

		case "blockquote":
			return <blockquote>{children}</blockquote>;

		case "link":
			return <a href={node.url}>{children}</a>;

		case "numbered-list":
			return <ol>{children}</ol>;

		case "bulleted-list":
			return <ul>{children}</ul>;

		case "list-item":
			return <li>{children}</li>;

		default:
			return <Fragment>{children}</Fragment>;
	}
};
