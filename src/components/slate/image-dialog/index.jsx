import FormTextInput from "@/components/text-input";
import { storage } from "@/modules/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { linkOutline } from "ionicons/icons";
import isUrl from "is-url";
import { extname } from "path-browserify";
import { useRef, useState } from "react";
import { Transforms } from "slate";
import { useSlate } from "slate-react";
import { v4 as uuidv4 } from "uuid";
import imageCompression from "browser-image-compression";
import "./style.scss";

const IMAGE_SIZE_LIMIT = 300_000; // in bytes

// https://images.unsplash.com/photo-1546587348-d12660c30c50?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8bmF0dXJhbHxlbnwwfHwwfHw%3D&w=1000&q=80

export default function ImageEditor({ closeModal }) {
	const editor = useSlate();

	const inputImageRef = useRef(null);
	const inputUrlRef = useRef(null);

	const [isUploading, setUploading] = useState(false);
	const [progress, setProgress] = useState(0);

	const addImageNode = (editor, node) => {
		const index = editor.selection
			? editor.selection.focus.path[0]
			: editor.children.length;

		Transforms.insertNodes(editor, node, { at: [index] });
		console.log("inserted image", index, node);
	};

	// For local images
	const onImageUpload = async (event) => {
		setUploading(true);

		let [file] = event.target.files;
		const imageId = uuidv4();
		const ext = extname(file.name);
		const path = `images/stories/${imageId}${ext}`;

		const locationRef = ref(storage, path);

		// compress image
		if (file.size > IMAGE_SIZE_LIMIT) {
			file = await imageCompression(file, {
				maxSizeMB: IMAGE_SIZE_LIMIT / 1e6,
				onProgress: (progress) => {
					setProgress(progress / 100);
				},
			});
		}

		const uploadTask = uploadBytesResumable(locationRef, file);

		// await uploadTask;
		uploadTask.on("state_changed", {
			next: (snapshot) => {
				setProgress(snapshot.bytesTransferred / snapshot.totalBytes);
			},
			error: (error) => {
				closeModal();
				setUploading(false);
				// TODO : show error dialog
				console.error(error);
			},
			complete: async () => {
				closeModal();
				setUploading(false);
				const url = await getDownloadURL(locationRef);
				const node = createImageNode("local", url, path);
				addImageNode(editor, node);
			},
		});
	};

	// For network images
	const onImageSubmit = (event) => {
		event.preventDefault();

		const url = inputUrlRef.current.value;
		if (!url) return;

		const node = createImageNode("network", url);
		addImageNode(editor, node);
		closeModal();
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

			{isUploading ? (
				<UploadInfo progress={progress} />
			) : (
				<button
					type="button"
					className="upload-image-button"
					onClick={() => inputImageRef.current.click()}
				>
					<input
						type={"file"}
						name="profile-image"
						hidden={true}
						accept={"image/png, image/jpg, image/jpeg, image/bmp, image/webp"}
						ref={inputImageRef}
						onChange={onImageUpload}
					/>
					<span>Upload</span>
				</button>
			)}
		</div>
	);
}

function createImageNode(source_type, url, bucket_path) {
	return {
		type: "image",
		url,
		caption: "",
		source_type,
		...(bucket_path && { bucket_path }),
		// empty text node as child for the Void element.
		children: [{ text: "" }],
	};
}

function UploadInfo({ progress, status }) {
	const barWidth = `${progress * 100}%`;
	return (
		<div className="upload-info">
			<div className="upload-track">
				<div className="upload-bar" style={{ width: barWidth }}></div>
			</div>
			<div className="uplaod-status">{status}</div>
		</div>
	);
}
