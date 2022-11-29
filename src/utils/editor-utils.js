import { Editor, Element, Range, Transforms, Text, Point } from "slate";
import isHotkey from "is-hotkey";

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

export function isLinkNodeAtSelection(editor, selection) {
	if (selection == null) return false;

	return (
		Editor.above(editor, {
			at: selection,
			match: (n) => n.type === "link",
		}) != null
	);
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

export function findLinkInSelection(editor) {
	// if selection is not collapsed, we do not proceed with the link detection
	if (editor.selection == null || !Range.isCollapsed(editor.selection)) {
		return;
	}

	// if we are already inside a link, exit early.
	const [node] = Editor.parent(editor, editor.selection);
	if (node.type === "link") return;

	// if we are not inside a text node, exit early.
	const [curNode, curNodePath] = Editor.node(editor, editor.selection);
	if (!Text.isText(curNode)) return;

	let start = Range.edges(editor.selection);
	const cursorPoint = start;

	const lastCharStart = Editor.before(editor, editor.selection, {
		unit: "character",
	});

	const lastChar = Editor.string(
		editor,
		Editor.range(editor, lastCharStart, cursorPoint)
	);

	if (lastChar !== " ") return;

	let end = lastCharStart;
	start = Editor.before(editor, end, { unit: "character" });

	const textNodeStart = Editor.point(editor, curNodePath, {
		edge: "start",
	});

	while (
		Editor.string((editor, Editor.range(editor, start, end))) !== " " &&
		!Point.isBefore(start, textNodeStart)
	) {
		end = start;
		start = Editor.before(editor, end, { unit: "character" });
	}

	const lastWordRange = Editor.range(editor, end, lastCharStart);
	const lastWord = Editor.string(editor, lastWordRange);

	console.log(lastWord);
}
