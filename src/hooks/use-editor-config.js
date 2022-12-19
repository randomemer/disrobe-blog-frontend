import { useCallback } from "react";
import { EditorEvents } from "@/utils/editor-utils";

export default function useEditorConfig(editor) {
	const { isVoid } = editor;
	editor.isVoid = (element) => {
		return element.type === "image" ? true : isVoid(element);
	};

	const onKeyDown = useCallback(
		(event) => EditorEvents.onKeyDown(editor, event),
		[editor]
	);

	return { onKeyDown };
}
