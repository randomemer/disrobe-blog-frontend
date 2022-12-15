import LinkEditor from "@/components/link-editor";
import useEditorConfig from "@/hooks/use-editor-config";
import { Fragment } from "react";
import { Editable, useSlate } from "slate-react";
import { RenderElement, RenderLeaf } from "./rendering";

export default function ArticleEditable() {
	const editor = useSlate();

	const { onKeyDown } = useEditorConfig(editor);

	return (
		<Fragment>
			<LinkEditor />
			<Editable
				className="slate-editor"
				onKeyDown={onKeyDown}
				renderElement={RenderElement}
				renderLeaf={RenderLeaf}
				spellCheck={true}
				autoFocus={true}
			/>
		</Fragment>
	);
}
