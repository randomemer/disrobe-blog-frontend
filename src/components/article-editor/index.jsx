import LinkEditor from "@/components/link-editor";
import { useEffect, useCallback, Fragment } from "react";
import { Editable, useSlate } from "slate-react";
import { renderLeaf, renderElement } from "./rendering";
import { KeyBindings } from "@/utils/editor-utils";

export default function ArticleEditable() {
	const editor = useSlate();

	useEffect(() => {
		// console.log("editor : ", editor);
	});

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

	return (
		<Fragment>
			<LinkEditor />
			<Editable
				className="slate-editor"
				onKeyDown={onKeyDown}
				renderElement={renderElement}
				renderLeaf={renderLeaf}
			/>
		</Fragment>
	);
}
