/* eslint-disable no-undef */
import { useLinkNode } from "@/hooks/use-link-node";
import { IonIcon } from "@ionic/react";
import { createPopper } from "@popperjs/core";
import { linkSharp } from "ionicons/icons";
import { useEffect, useRef, useState } from "react";
import { Editor, Node, Transforms } from "slate";
import { ReactEditor, useSlate } from "slate-react";
import "./style.scss";

function saveLink(editor, nodeEntry, linkUrl) {
	console.log("trig save node");
	if (!nodeEntry) return;
	console.log("node present to save");
	const [node, path] = nodeEntry;
	// Check if the link node is deleted
	if (!Node.matches(node, Editor.node(editor, path)?.[0])) return;
	console.log("saving link..");
	Transforms.setNodes(editor, { url: linkUrl }, { at: path });
}

// set link url only when the current active link node changes

export default function LinkEditor(props) {
	const editor = useSlate();
	const linkNodeEntry = useLinkNode();

	const linkEditorRef = useRef(null);

	const [linkUrl, setLinkUrl] = useState(linkNodeEntry?.[0].url || "");

	useEffect(() => {
		const linkEditorEl = linkEditorRef.current;
		console.log("changed linkeditor");

		// show link editor
		if (linkNodeEntry) {
			setLinkUrl(linkNodeEntry[0].url);
			// get the dom reference of both the link node and this link editor
			const linkEl = ReactEditor.toDOMNode(editor, linkNodeEntry[0]);

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

			linkEditorEl.classList.add("active");
			// entry animation for the link editor
			gsap.to(linkEditorEl, {
				ease: "expo.out",
				opacity: 1,
			});
		}
		// hide link editor
		else {
			gsap.to(linkEditorEl, {
				ease: "expo.out",
				opacity: 0,
				onComplete: () => linkEditorEl.classList.remove("active"),
			});
		}

		return () => {
			console.log(linkNodeEntry, linkUrl);
			saveLink(editor, linkNodeEntry, linkUrl);
		};
	}, [editor, linkNodeEntry]);

	return (
		<div ref={linkEditorRef} className="link-editor">
			<IonIcon icon={linkSharp} />
			<input
				type="url"
				placeholder="link"
				disabled={!linkNodeEntry}
				value={linkUrl}
				onChange={(event) => setLinkUrl(event.target.value)}
			/>
		</div>
	);
}
