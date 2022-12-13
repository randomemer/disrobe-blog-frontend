import { Element, Node, Transforms } from "slate";

export const TITLE = {
	type: "title",
	children: [{ text: "" }],
};

export const PARAGRAPH = {
	type: "paragraph",
	children: [{ text: "" }],
};

export default function withLayout(editor) {
	const { normalizeNode } = editor;

	editor.normalizeNode = ([node, path]) => {
		if (path.length === 0) {
			if (editor.children.length < 1) {
				Transforms.insertNodes(editor, TITLE, { at: path.concat(0) });
			}

			if (editor.children.length < 2) {
				Transforms.insertNodes(editor, PARAGRAPH, {
					at: path.concat(1),
				});
			}

			for (const [child, childPath] of Node.children(editor, path)) {
				let type;
				const slateIndex = childPath[0];
				const enforceType = (type) => {
					if (Element.isElement(child) && child.type !== type) {
						const newProperties = { type };
						Transforms.setNodes(editor, newProperties, {
							at: childPath,
						});
					}
				};

				switch (slateIndex) {
					case 0:
						type = "title";
						enforceType(type);
						break;
					case 1:
						type = "paragraph";
						enforceType(type);
						break;
					default:
						break;
				}
			}
		}

		return normalizeNode([node, path]);
	};

	return editor;
}
