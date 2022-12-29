import LinkEditor from "@/components/link-editor";
import useEditorConfig from "@/hooks/use-editor-config";
import { useLinkNode } from "@/hooks/use-link-node";
import { useCallback } from "react";
import { Fragment } from "react";
import { Editable } from "slate-react";
import { EditorElement, EditorLeaf } from "./rendering";

export default function ArticleEditable() {
	const linkNode = useLinkNode();
	const { onKeyDown } = useEditorConfig();

	const renderElement = useCallback(
		(props) => <EditorElement {...props} />,
		[]
	);
	const renderLeaf = useCallback((props) => <EditorLeaf {...props} />, []);

	return (
		<Fragment>
			{linkNode ? <LinkEditor /> : null}
			<Editable
				autoFocus
				spellCheck
				className="slate-editor"
				onKeyDown={onKeyDown}
				renderElement={renderElement}
				renderLeaf={renderLeaf}
			/>
		</Fragment>
	);
}
