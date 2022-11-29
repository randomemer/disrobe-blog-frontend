/* eslint-disable no-undef */
import { isLinkNodeAtSelection } from "@/routes/write/article-editor/modules/utils";
import { IonIcon } from "@ionic/react";
import { createPopper } from "@popperjs/core";
import { linkSharp } from "ionicons/icons";
import { useEffect, useRef, useState } from "react";
import { Editor, Transforms } from "slate";
import { ReactEditor, useSlate } from "slate-react";
import "./style.scss";

export default function LinkEditor(props) {
	const editor = useSlate();

	const linkEditorRef = useRef(null);
	const linkNodeRef = useRef(null);

	const [linkNode, setLinkNode] = useState(null);
	const [linkUrl, setLinkUrl] = useState("");

	const isActive = isLinkNodeAtSelection(editor, editor.selection);

	const saveLink = (url) => {
		Transforms.setNodes(editor, { url }, { at: linkNodeRef.current.path });
	};

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

			// setLinkUrl(linkNode.url);
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

			gsap.to(linkEditorEl, {
				ease: "expo.out",
				opacity: 0,
				onComplete: () => {
					linkEditorEl.classList.remove("active");
				},
			});
		}

		return () => {
			// console.log("unmounted link editor");
			// is there anything to clean up here?
			saveLink(linkUrl);
		};
	}, [editor, isActive]);

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
