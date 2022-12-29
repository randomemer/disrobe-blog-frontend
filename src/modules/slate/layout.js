import { Element, Node, Transforms } from "slate";

export const DEFAULT_TITLE = {
	type: "title",
	children: [{ text: "" }],
};

export const DEFAULT_PARAGRAPH = {
	type: "paragraph",
	children: [{ text: "" }],
};

const rules = [
	{
		path: [0],
		defaultElement: DEFAULT_TITLE,
		checker: (node) => node.type === "title",
	},
	{
		path: [1],
		defaultElement: DEFAULT_PARAGRAPH,
		checker: (node) => node.type !== "title",
	},
];

function enforceRule(editor, rule) {
	const { path, defaultElement, checker } = rule;
	const node = Node.has(editor, path) && Node.get(editor, path);

	if (node) {
		if (Element.isElement(node) && !checker(node)) {
			Transforms.setNodes(editor, { type: defaultElement.type }, { at: path });
			return true;
		}
	} else {
		try {
			Transforms.insertNodes(editor, defaultElement, { at: path });
			return true;
		} catch (error) {
			console.error(error);
		}
	}

	return false;
}

export default function withLayout(editor) {
	const { normalizeNode } = editor;

	// const ELEMENT_TYPES = {
	// 	title: ([node, path]) => {
	// 		if (Element.isElement(node) && node.type !== "title") {
	// 			Transforms.setNodes(editor, { type: "title" }, { at: path });
	// 		}
	// 	},
	// 	paragraph: ([node, path]) => {
	// 		if (Element.isElement(node) && node.type !== "paragraph") {
	// 			Transforms.setNodes(editor, { type: "paragraph" }, { at: path });
	// 		}
	// 	},
	// };

	editor.normalizeNode = ([node, path]) => {
		// normalize the editor itself
		if (!path.length) {
			console.log("Normalizing at :", path, editor.children);
			const shouldSkipNorm = rules.some((rule) => enforceRule(editor, rule));

			if (shouldSkipNorm) return;

			// // add default title when its missing
			// if (editor.children.length < 1) {
			// 	Transforms.insertNodes(editor, DEFAULT_TITLE, {
			// 		at: path.concat(0),
			// 	});
			// }

			// // add default paragraph when its missing
			// if (editor.children.length < 2) {
			// 	Transforms.insertNodes(editor, DEFAULT_PARAGRAPH, {
			// 		at: path.concat(1),
			// 	});
			// }

			// console.log("normalized : ", node, path);

			// for (const [child, childPath] of Node.children(editor, path)) {
			// 	const slateIndex = childPath[0];

			// 	if (slateIndex === 0) {
			// 		ELEMENT_TYPES.title([child, childPath]);
			// 		return;
			// 	}
			// 	if (slateIndex === 1) {
			// 		ELEMENT_TYPES.paragraph(child, childPath);
			// 		return;
			// 	}
			// }
		}

		return normalizeNode([node, path]);
	};

	return editor;
}
