import classNames from "classnames";
import isHotkey from "is-hotkey";
import { useCallback, useState } from "react";
import { Editor, Transforms } from "slate";
import { useFocused, useSelected, useSlate } from "slate-react";
import "./style.scss";

export default function ArticleImage({ attributes, children, element }) {
	const editor = useSlate();
	const isSelected = useSelected();
	const isFocused = useFocused();

	const [caption, setCaption] = useState(element.caption);

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
		(event) => setCaption(event.target.value),
		[setCaption]
	);

	const onKeyDown = useCallback(
		(event) => {
			if (!isHotkey("enter", event)) {
				return;
			}

			applyCaptionChange(event.target.value);
		},
		[applyCaptionChange]
	);

	const onCaptionBlur = useCallback(
		(event) => {
			applyCaptionChange(caption);
		},
		[caption, applyCaptionChange]
	);

	return (
		<div
			className={classNames("editor-image", {
				"image-selected": isFocused && isSelected,
			})}
			contentEditable={false}
			{...attributes}
		>
			<div className="image-container">
				<img
					src={String(element.url)}
					alt={element.caption}
					className="image"
				/>
				<input
					className="image-caption-input"
					defaultValue={element.caption}
					onKeyDown={onKeyDown}
					onChange={onCaptionChange}
					onBlur={onCaptionBlur}
				/>
			</div>
			{children}
		</div>
	);
}
