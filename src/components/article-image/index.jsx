import { IonIcon } from "@ionic/react";
import classNames from "classnames";
import { trashOutline, createOutline } from "ionicons/icons";
import isHotkey from "is-hotkey";
import { useCallback, useState } from "react";
import { Editor, Transforms } from "slate";
import { useFocused, useSelected, useSlate } from "slate-react";
import "./style.scss";

function ImageButtons(props) {
	const editor = useSlate();

	const onDeleteImage = (event) => {
		console.log(editor.children);
		event.preventDefault();

		Transforms.removeNodes(editor, {
			match: (node) => node.type === "image",
		});

		console.log(editor.children);
	};

	const onUpdateImage = (event) => {
		event.preventDefault();

		const [imageNode] = Editor.above(editor, {
			match: (node) => node.type === "image",
		});

		console.log(imageNode);
	};

	return (
		<div className="image-buttons">
			<button onClick={onDeleteImage}>
				<IonIcon icon={trashOutline} />
			</button>
			<button onClick={onUpdateImage}>
				<IonIcon icon={createOutline} />
			</button>
		</div>
	);
}

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

	const onKeyDown = useCallback(
		(event) => {
			if (!isHotkey("enter", event)) {
				return;
			}

			applyCaptionChange(event.target.value);
		},
		[applyCaptionChange]
	);

	const onCaptionChange = useCallback(
		(event) => setCaption(event.target.value),
		[setCaption]
	);

	const onCaptionBlur = useCallback(
		(event) => applyCaptionChange(caption),
		[caption, applyCaptionChange]
	);

	return (
		// Need `contentEditable={false}` or Firefox has issues with certain input types.
		<div
			{...attributes}
			className={classNames("editor-image", {
				"editor-image--selected": isFocused && isSelected,
			})}
			contentEditable={false}
		>
			<figure className="image-container">
				<div className="image-wrapper">
					<ImageButtons isActive={isFocused && isSelected} />
					<img src={String(element.url)} alt={element.caption} />
				</div>
				<figcaption className="image-caption">
					<input
						type="text"
						placeholder="A caption for your image"
						defaultValue={element.caption}
						onChange={onCaptionChange}
						onKeyDown={onKeyDown}
						onBlur={onCaptionBlur}
					/>
				</figcaption>
			</figure>
			{children}
		</div>
	);
}
