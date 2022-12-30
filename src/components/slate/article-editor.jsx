import useEditorConfig from "@/hooks/use-editor-config";
import { useCallback } from "react";
import { Editable } from "slate-react";
import { SlateElement, SlateLeaf } from "./rendering";

export default function ArticleEditable() {
	const { onKeyDown } = useEditorConfig();

	const renderElement = useCallback((props) => <SlateElement {...props} />, []);
	const renderLeaf = useCallback((props) => <SlateLeaf {...props} />, []);

	return (
		<Editable
			autoFocus
			spellCheck
			className="article-editor"
			onKeyDown={onKeyDown}
			renderElement={renderElement}
			renderLeaf={renderLeaf}
		/>
	);
}
