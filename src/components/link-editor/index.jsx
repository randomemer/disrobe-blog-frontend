/* eslint-disable no-undef */
import { isLinkActive } from "@/utils/editor-utils";
import { IonIcon } from "@ionic/react";
import { createPopper } from "@popperjs/core";
import { linkSharp } from "ionicons/icons";
import { useCallback } from "react";
import { useEffect, useRef, useState } from "react";
import { Editor, Transforms } from "slate";
import { ReactEditor, useSlate } from "slate-react";
import "./style.scss";

export default function LinkEditor(props) {
	const editor = useSlate();

	const linkEditorRef = useRef(null);
	const linkNodeRef = useRef(null);

	const [linkUrl, setLinkUrl] = useState("");

	const saveLink = useCallback(() => {
		if (!linkNodeRef.current) return;
		Transforms.setNodes(
			editor,
			{ url: linkUrl },
			{ at: linkNodeRef.current.path }
		);
	}, [editor, linkUrl]);

	const isActive = isLinkActive(editor, editor.selection);

	useEffect(() => {
		const linkEditorEl = linkEditorRef.current;

		// show link editor
		if (isActive) {
			// get the link node at the place
			const [node, path] = Editor.above(editor, {
				match: (node) => node.type === "link",
			});

			linkNodeRef.current = { node, path };
			setLinkUrl(node.url);

			// get the dom reference of both the link node and this editor
			const linkEl = ReactEditor.toDOMNode(editor, node);

			// show the editor as a popover
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

			linkEditorEl.classList.add("active");
			// entry animation for the link editor
			gsap.to(linkEditorEl, {
				ease: "expo.out",
				opacity: 1,
			});
		}
		// hide link editor
		else {
			// save the link if valid
			saveLink();

			gsap.to(linkEditorEl, {
				ease: "expo.out",
				opacity: 0,
				onComplete: () => linkEditorEl.classList.remove("active"),
			});
		}
	}, [isActive, editor, editor.selection, saveLink]);

	return (
		<div ref={linkEditorRef} className="link-editor">
			<IonIcon icon={linkSharp} />
			<input
				type={"url"}
				placeholder="link"
				disabled={!isActive}
				value={linkUrl}
				onChange={(event) => setLinkUrl(event.target.value)}
			/>
		</div>
	);
}
