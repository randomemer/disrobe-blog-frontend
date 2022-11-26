import { Editor, Element, Range, Transforms } from "slate";
import isHotkey from "is-hotkey";

export function getActiveStyles(editor) {
	return new Set(Object.keys(Editor.marks(editor) ?? {}));
}

export function toggleStyle(editor, style) {
	const activeStyles = getActiveStyles(editor);
	if (activeStyles.has(style)) {
		Editor.removeMark(editor, style);
	} else {
		Editor.addMark(editor, style, true);
	}
}

export function toggleLink(editor) {
	if (!isLinkNodeAtSelection(editor, editor.selection)) {
		const isSectionCollapsed = Range.isCollapsed(editor.selection);
		if (isSectionCollapsed) {
			// nothing is selected currently
			Transforms.insertNodes(
				editor,
				{
					type: "link",
					url: "#",
					children: [{ text: "link" }],
				},
				{ at: editor.selection }
			);
		} else {
			// there is a selection spanning some node(s), so wrap with a link
			Transforms.wrapNodes(
				editor,
				{ type: "link", url: "#", children: [{ text: "" }] },
				{ split: true, at: editor.selection }
			);
		}
	} else {
		// find the nearest ancestor element of type link and unwrap its nodes
		Transforms.unwrapNodes(editor, {
			match: (n) => Element.isElement(n) && n.type === "link",
		});
	}
}

export function isLinkNodeAtSelection(editor, selection) {
	if (selection == null) return false;

	return (
		Editor.above(editor, {
			at: selection,
			match: (n) => n.type === "link",
		}) != null
	);
}

export const KeyBindings = {
	onKeyDown: (editor, event) => {
		if (isHotkey("mod+b", event)) {
			toggleStyle(editor, "bold");
			return;
		}
		if (isHotkey("mod+i", event)) {
			toggleStyle(editor, "italic");
			return;
		}
		if (isHotkey("mod+c", event)) {
			toggleStyle(editor, "code");
			return;
		}
		if (isHotkey("mod+u", event)) {
			toggleStyle(editor, "underline");
			return;
		}
	},
};
