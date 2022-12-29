import { Element, Node, Transforms } from "slate";

export const DEFAULT_TITLE = {
	type: "title",
	children: [{ text: "" }],
};

export const DEFAULT_PARAGRAPH = {
	type: "paragraph",
	children: [{ text: "" }],
};

export default function withLayout(editor) {
	const { normalizeNode } = editor;

	const ELEMENT_TYPES = {
		title: ([node, path]) => {
			if (Element.isElement(node) && node.type !== "title") {
				Transforms.setNodes(editor, { type: "title" }, { at: path });
			}
		},
		paragraph: ([node, path]) => {
			if (Element.isElement(node) && node.type !== "paragraph") {
				Transforms.setNodes(editor, { type: "paragraph" }, { at: path });
			}
		},
	};

	editor.normalizeNode = ([node, path]) => {
		// normalize the editor itself
		if (path.length === 0) {
			// add default title when its missing
			if (editor.children.length < 1) {
				Transforms.insertNodes(editor, DEFAULT_TITLE, {
					at: path.concat(0),
				});
			}

			// add default paragraph when its missing
			if (editor.children.length < 2) {
				Transforms.insertNodes(editor, DEFAULT_PARAGRAPH, {
					at: path.concat(1),
				});
			}

			console.log("normalized : ", node, path);

			for (const [child, childPath] of Node.children(editor, path)) {
				const slateIndex = childPath[0];

				// if (slateIndex === 0) {
				// 	ELEMENT_TYPES.title([child, childPath]);
				// 	return;
				// }
				// if (slateIndex === 1) {
				// 	ELEMENT_TYPES.paragraph(child, childPath);
				// }
			}
		}

		return normalizeNode([node, path]);
	};

	return editor;
}
