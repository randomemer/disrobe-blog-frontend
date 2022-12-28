/* eslint-disable no-undef */
import { useLinkNode } from "@/hooks/use-link-node";
import { IonIcon } from "@ionic/react";
import { createPopper } from "@popperjs/core";
import { checkmarkSharp, linkSharp } from "ionicons/icons";
import { useEffect, useRef, useState } from "react";
import { Transforms } from "slate";
import { ReactEditor, useSlate } from "slate-react";
import "./style.scss";

export default function LinkEditor() {
	const editor = useSlate();
	const [node, path] = useLinkNode();
	const linkEditorRef = useRef(null);

	const [linkUrl, setLinkUrl] = useState(node.url);

	const saveLink = () => {
		Transforms.setNodes(editor, { url: linkUrl }, { at: path });
	};

	useEffect(() => {
		const linkEditorEl = linkEditorRef.current;
		if (!linkEditorEl) return;

		// get the dom reference of both the link node and this link editor
		const linkEl = ReactEditor.toDOMNode(editor, node);

		// show the link editor as a popover
		createPopper(linkEl, linkEditorEl, {
			placement: "top",
			modifiers: [
				{
					name: "offset",
					phase: "main",
					enabled: true,
					options: { offset: [0, 10] },
				},
			],
		});
	}, [editor, node]);

	return (
		<div ref={linkEditorRef} className="link-editor">
			<IonIcon icon={linkSharp} />
			<input
				type="url"
				placeholder="link"
				value={linkUrl}
				onChange={(event) => setLinkUrl(event.target.value)}
			/>
			<button type="button" onClick={saveLink}>
				<IonIcon icon={checkmarkSharp} />
			</button>
			{/* <button type="button" onClick={saveLink}>
				<IonIcon icon={checkmarkSharp} />
			</button> */}
		</div>
	);
}
