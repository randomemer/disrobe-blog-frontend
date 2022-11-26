import { useEffect, useCallback } from "react";
import { Editable, useSlate } from "slate-react";
import { renderLeaf, renderElement } from "./modules/rendering";
import { KeyBindings } from "./modules/utils";

export default function ArticleEditable() {
	const editor = useSlate();

	const { isInline } = editor;
	editor.isInline = (element) => {
		return element.type === "link" ? true : isInline(element);
	};
	useEffect(() => {
		console.table(editor);
	});

	const onKeyDown = useCallback(
		(event) => KeyBindings.onKeyDown(editor, event),
		[editor]
	);

	return (
		<Editable
			className="slate-editor"
			onKeyDown={onKeyDown}
			renderElement={renderElement}
			renderLeaf={renderLeaf}
		/>
	);
}
