import useEditorConfig from "@/hooks/use-editor-config";
import { useCallback } from "react";
import { Editable } from "slate-react";
import { EditorElement, EditorLeaf } from "./rendering";

export default function ArticleEditable() {
	const { onKeyDown } = useEditorConfig();

	const renderElement = useCallback(
		(props) => <EditorElement {...props} />,
		[]
	);
	const renderLeaf = useCallback((props) => <EditorLeaf {...props} />, []);

	return (
		<Editable
			autoFocus
			spellCheck
			className="slate-editor"
			onKeyDown={onKeyDown}
			renderElement={renderElement}
			renderLeaf={renderLeaf}
		/>
	);
}
