import LinkEditor from "@/components/link-editor";
import useEditorConfig from "@/hooks/use-editor-config";
import { Fragment, useEffect } from "react";
import { Editable, ReactEditor, useSlate } from "slate-react";
import { RenderElement, RenderLeaf } from "./rendering";

export default function ArticleEditable() {
	const editor = useSlate();

	useEffect(() => {
		const children = editor.children;

		for (const child of children) {
			const el = ReactEditor.toDOMNode(editor, child);
			if (child.type === "paragraph") {
				el.classList.add("editor-block--para");
			}

			if (child.type === "image") {
				el.classList.add("editor-block--image");
			}
		}
	}, [editor]);

	const { onKeyDown } = useEditorConfig(editor);

	return (
		<Fragment>
			<LinkEditor />
			<Editable
				className="slate-editor"
				onKeyDown={onKeyDown}
				renderElement={RenderElement}
				renderLeaf={RenderLeaf}
			/>
		</Fragment>
	);
}
