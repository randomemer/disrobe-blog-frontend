import { useCallback } from "react";
import { EditorEvents } from "@/utils/editor-utils";
import { useSlate } from "slate-react";

const VOID_ELEMENTS = ["image"];

export default function useEditorConfig() {
	const editor = useSlate();

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
