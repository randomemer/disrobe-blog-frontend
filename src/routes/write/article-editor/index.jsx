import LinkEditor from "@/components/link-editor";
import { useEffect, useCallback, Fragment } from "react";
import { Editable, useSlate } from "slate-react";
import { renderLeaf, renderElement } from "./modules/rendering";
import { isLinkNodeAtSelection, KeyBindings } from "./modules/utils";

export default function ArticleEditable() {
	const editor = useSlate();

	useEffect(() => {
		// console.log("editor : ", editor);
	});

	const { isInline } = editor;
	editor.isInline = (element) => {
		return element.type === "link" ? true : isInline(element);
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
