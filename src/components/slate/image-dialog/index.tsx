import FileDragArea from "@/components/file-drag-area";
import { getObjectPublicURL } from "@/modules/backend/utils";
import {
  AddPhotoAlternateOutlined,
  ImageOutlined,
  LinkOutlined,
} from "@mui/icons-material";
import { InputAdornment } from "@mui/material";
import imageCompression from "browser-image-compression";
import { getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { extname } from "path-browserify";
import { useEffect, useRef, useState } from "react";
import { Transforms } from "slate";
import { useSlate } from "slate-react";
import { v4 as uuidv4 } from "uuid";
import {
  AddButton,
  CloseButton,
  ImageModalActions,
  ImageModalContent,
  ImageModalTitle,
  ImageURLField,
  ORDivider,
  UploadInfo,
  UploadProgress,
  UploadStatus,
} from "./styles";

import type { ImageElement } from "@/types/slate";
import type { FormEvent, MouseEvent } from "react";
import type { Editor } from "slate";

const IMAGE_SIZE_LIMIT = 300_000; // in bytes

export interface ImageEditorProps {
  closeModal: () => void;
}

export default function ImageEditor(props: ImageEditorProps) {
  const { closeModal } = props;
  const editor = useSlate();

  const inputImageRef = useRef(null);

  const [isUploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {}, [isUploading, progress, status]);

  const addImageNode = (editor: Editor, node: ImageElement) => {
    const index = editor.selection
      ? editor.selection.focus.path[0]
      : editor.children.length;

    Transforms.insertNodes(editor, node, { at: [index] });
  };

  // For local images
  const onImageUpload = async (event: Event & { target: HTMLInputElement }) => {
    setUploading(true);

    if (!event.target.files) return;

    let file = event.target.files[0];
    const storage = getStorage();
    const path = `images/stories/${uuidv4()}${extname(file.name)}`;
    const locationRef = ref(storage, path);

    // compress image
    if (file.size > IMAGE_SIZE_LIMIT) {
      setStatus("compressing");
      file = await imageCompression(file, {
        maxSizeMB: IMAGE_SIZE_LIMIT / 1e6,
        onProgress: (progress) => {
          setProgress(progress);
        },
      });
    }

    console.log(file.size);

    const uploadTask = uploadBytesResumable(locationRef, file);
    setStatus("uploading");
    uploadTask.on("state_changed", {
      next: (snapshot) => {
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      error: (error) => {
        // TODO : show error dialog
        console.error(error);
      },
      complete: () => {
        const url = getObjectPublicURL(path);
        const node = createImageNode(url);
        addImageNode(editor, node);
      },
    });

    await uploadTask;

    closeModal();
    setUploading(false);
  };

  // For network images
  const onImageSubmit = (event: FormEvent | MouseEvent) => {
    event.preventDefault();

    if (!url) return;

    const node = createImageNode(url);
    addImageNode(editor, node);
    closeModal();
  };

  return (
    <>
      <ImageModalTitle>Add Image</ImageModalTitle>

      <ImageModalContent>
        {!isUploading ? (
          <>
            <FileDragArea
              id="image-input"
              icon={<ImageOutlined />}
              inputRef={inputImageRef}
              onDrop={onImageUpload}
              inputProps={{ accept: "image/*", onChange: onImageUpload }}
            />

            <div>
              <ORDivider>OR</ORDivider>
            </div>

            <form onSubmit={onImageSubmit}>
              <ImageURLField
                type="url"
                fullWidth
                variant="standard"
                placeholder="Image URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LinkOutlined />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <AddButton type="submit" onClick={onImageSubmit}>
                        <AddPhotoAlternateOutlined />
                      </AddButton>
                    </InputAdornment>
                  ),
                }}
              />
            </form>
          </>
        ) : (
          <UploadInfo>
            <UploadProgress variant="determinate" value={progress} />
            <UploadStatus>{`${status} : ${progress.toFixed(0)}%`}</UploadStatus>
          </UploadInfo>
        )}
      </ImageModalContent>

      <ImageModalActions>
        <CloseButton variant="outlined" onClick={closeModal}>
          Close
        </CloseButton>
      </ImageModalActions>
    </>
  );
}

function createImageNode(url: string): ImageElement {
  return {
    type: "image",
    url,
    caption: "",
    // empty text node as child for the Void element.
    children: [{ text: "" }],
  };
}
