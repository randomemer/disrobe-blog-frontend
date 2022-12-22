import { useCallback } from "react";
import { EditorEvents } from "@/utils/editor-utils";

const VOID_ELEMENTS = ["image"];

export default function useEditorConfig(editor) {
	const { isVoid } = editor;
	editor.isVoid = (element) => {
		return VOID_ELEMENTS.includes(element.type) ? true : isVoid(element);
	};

	const onKeyDown = useCallback(
		(event) => EditorEvents.onKeyDown(editor, event),
		[editor]
	);

	return { onKeyDown };
}
