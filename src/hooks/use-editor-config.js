import { useCallback } from "react";
import { KeyBindings } from "@/utils/editor-utils";

export default function useEditorConfig(editor) {
	const { isInline } = editor;
	editor.isInline = (element) => {
		return element.type === "link" ? true : isInline(element);
	};

	const { isVoid } = editor;
	editor.isVoid = (element) => {
		return element.type === "image" ? true : isVoid(element);
	};

	const onKeyDown = useCallback(
		(event) => KeyBindings.onKeyDown(editor, event),
		[editor]
	);

	return { onKeyDown };
}
