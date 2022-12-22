import { Editor, Element, Range, Transforms } from "slate";
import isHotkey, { isKeyHotkey } from "is-hotkey";
import { saveArticleDraft } from "@/modules/article/auto-save";

export const LIST_TYPES = ["bulleted-list", "numbered-list"];

const KEY_BINDINGS = {
	"mod+b": (editor) => toggleMark(editor, "bold"),
	"mod+i": (editor) => toggleMark(editor, "italic"),
	"mod+u": (editor) => toggleMark(editor, "underline"),
	"mod+`": (editor) => toggleMark(editor, "code"),
	"shift+enter": (editor) => Editor.insertSoftBreak(editor),
	"mod+s": (editor) => saveArticleDraft(editor),
};
const KEY_BINDINGS_ENTRIES = Object.entries(KEY_BINDINGS);

export const EditorEvents = {
	onKeyDown: (editor, event) => {
		// Default left/right behavior is unit:'character'.
		// This fails to distinguish between two cursor positions, such as
		// <inline>foo<cursor/></inline> vs <inline>foo</inline><cursor/>.
		// Here we modify the behavior to unit:'offset'.
		// This lets the user step into and out of the inline without stepping over characters.
		// You may wish to customize this further to only use unit:'offset' in specific cases.
		if (editor.selection && Range.isCollapsed(editor.selection)) {
			const { nativeEvent } = event;
			if (isKeyHotkey("left", nativeEvent)) {
				event.preventDefault();
				Transforms.move(editor, { unit: "offset", reverse: true });
			} else if (isKeyHotkey("right", nativeEvent)) {
				event.preventDefault();
				Transforms.move(editor, { unit: "offset" });
			}
		}

		// Check for registered key bindings
		const index = KEY_BINDINGS_ENTRIES.findIndex(([key]) =>
			isHotkey(key, event)
		);

		if (index !== -1) {
			const [key, func] = KEY_BINDINGS_ENTRIES[index];
			event.preventDefault();
			func(editor);
		}
	},
};

export function withPlugins(editor, plugins) {
	return plugins.reduce((prev, plugin) => plugin(prev), editor);
}

export function isMarkActive(editor, format) {
	const marks = Editor.marks(editor);
	return marks ? marks[format] === true : false;
}

export function toggleMark(editor, format) {
	const isActive = isMarkActive(editor, format);

	if (isActive) {
		Editor.removeMark(editor, format);
	} else {
		Editor.addMark(editor, format, true);
	}
}

export function getActiveLinkNode(editor) {
	return Editor.above(editor, {
		match: (node) =>
			!Editor.isEditor(node) &&
			Element.isElement(node) &&
			node.type === "link",
	});
}

export function wrapLink(editor, url) {
	if (getActiveLinkNode(editor)) {
		unwrapLink(editor);
	}

	const { selection } = editor;
	const isCollapsed = selection && Range.isCollapsed(selection);
	const link = {
		type: "link",
		url,
		children: isCollapsed ? [{ text: url }] : [],
	};

	if (isCollapsed) {
		Transforms.insertNodes(editor, link);
	} else {
		Transforms.wrapNodes(editor, link, { split: true });
		Transforms.collapse(editor, { edge: "end" });
	}
}

export function unwrapLink(editor) {
	// find the nearest ancestor element of type link and unwrap its nodes
	Transforms.unwrapNodes(editor, {
		match: (node) =>
			!Editor.isEditor(node) &&
			Element.isElement(node) &&
			node.type === "link",
	});
}

export function toggleLink(editor) {
	if (!getActiveLinkNode(editor)) {
		if (editor.selection) {
			wrapLink(editor, "https://www.google.com");
		}
	} else {
		unwrapLink(editor);
	}
}

export function isBlockActive(editor, format) {
	const { selection } = editor;
	if (!selection) return false;

	const [match] = Array.from(
		Editor.nodes(editor, {
			at: Editor.unhangRange(editor, selection),
			match: (node) =>
				!Editor.isEditor(node) &&
				Element.isElement(node) &&
				node.type === format,
		})
	);

	return !!match;
}

export function toggleBlock(editor, format) {
	const isActive = isBlockActive(editor, format);
	const isList = LIST_TYPES.includes(format);

	Transforms.unwrapNodes(editor, {
		match: (node) =>
			!Editor.isEditor(node) &&
			Element.isElement(node) &&
			LIST_TYPES.includes(node.type),
		split: true,
	});

	const newProperties = {
		type: isActive ? "paragraph" : isList ? "list-item" : format,
	};
	Transforms.setNodes(editor, newProperties);

	if (!isActive && isList) {
		const block = { type: format, children: [] };
		Transforms.wrapNodes(editor, block);
	}
}
