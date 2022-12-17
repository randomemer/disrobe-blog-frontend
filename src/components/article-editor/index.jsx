import LinkEditor from "@/components/link-editor";
import useEditorConfig from "@/hooks/use-editor-config";
import { useCallback } from "react";
import { Fragment } from "react";
import { Editable, useSlate } from "slate-react";
import { EditorElement, EditorLeaf } from "./rendering";

export default function ArticleEditable() {
	const editor = useSlate();

	const renderElement = useCallback(
		(props) => <EditorElement {...props} />,
		[]
	);
	const renderLeaf = useCallback((props) => <EditorLeaf {...props} />, []);

	const { onKeyDown } = useEditorConfig(editor);

	return (
		<Fragment>
			<LinkEditor />
			<Editable
				className="slate-editor"
				onKeyDown={onKeyDown}
				renderElement={renderElement}
				renderLeaf={renderLeaf}
				spellCheck
				autoFocus
			/>
		</Fragment>
	);
}
