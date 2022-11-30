import classNames from "classnames";
import isHotkey from "is-hotkey";
import { useCallback, useState } from "react";
import { Editor, Transforms } from "slate";
import { useSlate } from "slate-react";
import "./style.scss";

export default function ArticleImage({ attributes, children, element }) {
	const [isEditingCaption, setEditingCaption] = useState(false);
	const [caption, setCaption] = useState(element.caption);

	const editor = useSlate();

	const applyCaptionChange = useCallback(
		(caption) => {
			const imageNodeEntry = Editor.above(editor, {
				match: (node) => node.type === "image",
			});

			if (!imageNodeEntry) return;

			if (caption != null) {
				setCaption(caption);
			}

			Transforms.setNodes(editor, { caption }, { at: imageNodeEntry[1] });
		},
		[editor, setCaption]
	);

	const onCaptionChange = useCallback(
		(event) => {
			setCaption(event.target.value);
		},
		[setCaption, editor.selection]
	);

	const onKeyDown = useCallback(
		(event) => {
			if (!isHotkey("enter", event)) {
				return;
			}

			applyCaptionChange(event.target.value);
			setEditingCaption(false);
		},
		[applyCaptionChange, setEditingCaption]
	);

	const onToggleCaptionEditMode = useCallback(
		(event) => {
			const wasEditing = isEditingCaption;
			setEditingCaption(!isEditingCaption);
			wasEditing && applyCaptionChange(caption);
		},
		[caption, isEditingCaption, applyCaptionChange, editor.selection]
	);

	return (
		<div contentEditable={false} {...attributes}>
			<div className={classNames({ "image-container": true })}>
				<img
					src={String(element.url)}
					alt={element.caption}
					className="image"
				/>
				{isEditingCaption ? (
					<input
						autoFocus={true}
						className="image-caption-input"
						defaultValue={element.caption}
						onKeyDown={onKeyDown}
						onChange={onCaptionChange}
						onBlur={onToggleCaptionEditMode}
					/>
				) : (
					<div
						className="image-caption-read-mode"
						onClick={onToggleCaptionEditMode}
					>
						{caption}
					</div>
				)}
			</div>
			{children}
		</div>
	);
}
