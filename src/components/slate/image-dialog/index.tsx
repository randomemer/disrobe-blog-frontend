import FileDragArea from "@/components/file-drag-area";
import {
  AddPhotoAlternateOutlined,
  ImageOutlined,
  LinkOutlined,
} from "@mui/icons-material";
import { InputAdornment } from "@mui/material";
import { getStorage, ref } from "firebase/storage";
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
import clientMediaRepo from "@/modules/backend/client/repos/media";

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
    const path = `images/stories/${uuidv4()}${extname(file.name)}`;

    await clientMediaRepo.upload(path, file);

    setUrl(path);

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
