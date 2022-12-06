import FormTextInput from "@/components/text-input";
import { linkOutline } from "ionicons/icons";
import isUrl from "is-url";
import { useRef } from "react";
import { Transforms } from "slate";
import { useSlate } from "slate-react";
import "./style.scss";

// https://images.unsplash.com/photo-1546587348-d12660c30c50?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8bmF0dXJhbHxlbnwwfHwwfHw%3D&w=1000&q=80

const createImageNode = (url) => ({
	type: "image",
	url,
	caption: "",
	// empty text node as child for the Void element.
	children: [{ text: "" }],
});

function addImageNode(editor, node) {
	const index = editor.selection
		? editor.selection.focus.path[0]
		: editor.children.length;

	console.log("inserting image..", node);
	Transforms.insertNodes(editor, node, { at: [index] });
	console.log("inserted image", index);
}

export default function ImageEditor(props) {
	const editor = useSlate();

	const inputImageRef = useRef(null);
	const inputUrlRef = useRef(null);
	// const [image, setImage] = useState(props.url || null);

	const onImageUpload = (event) => {
		const [file] = event.target.files;
		const node = createImageNode(URL.createObjectURL(file));
		addImageNode(editor, node);
		props.closeModal();
	};

	const onImageSubmit = (event) => {
		event.preventDefault();

		console.log(inputUrlRef);
		const url = inputUrlRef.current.value;
		if (!url) return;
		console.log(url);

		const node = createImageNode(url);
		addImageNode(editor, node);
		props.closeModal();
	};

	return (
		<div className="image-editor-container">
			<form className="form-row" onSubmit={onImageSubmit}>
				<FormTextInput
					className="image-url-input"
					prefixIcon={linkOutline}
					ref={inputUrlRef}
					validators={[isUrl]}
					inputOptions={{
						type: "url",
						placeholder: "Enter a image url...",
					}}
				/>
				<button
					type="submit"
					className="insert-image-button button"
					onClick={onImageSubmit}
				>
					Add Image
				</button>
			</form>

			<div className="or-element">
				<span className="line"></span>
				<span className="or">OR</span>
				<span className="line"></span>
			</div>

			<button
				type="button"
				className="upload-image-button"
				onClick={() => inputImageRef.current.click()}
			>
				<input
					type={"file"}
					name="profile-image"
					hidden={true}
					accept={
						"image/png, image/jpg, image/jpeg, image/bmp, image/webp"
					}
					ref={inputImageRef}
					onChange={onImageUpload}
				/>
				<span>Upload</span>
			</button>
		</div>
	);
}
