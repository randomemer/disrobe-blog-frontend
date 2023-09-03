import { DeleteOutline } from "@mui/icons-material";
import classNames from "classnames";
import isHotkey from "is-hotkey";
import { useCallback, useState } from "react";
import { Editor, Element, Transforms } from "slate";
import { useFocused, useSelected, useSlate } from "slate-react";
import {
  ButtonsWrapper,
  ButtonWrapper,
  CaptionField,
  DeleteButton,
  EImage,
  EimageContainer,
  ImageCaption,
  ImageContainer,
  ImageWrapper,
} from "./styles";

import type { ImageElement } from "@/types/slate";
import type {
  ChangeEventHandler,
  FocusEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
} from "react";
import type { RenderElementProps } from "slate-react";

export interface EditorImageProps extends RenderElementProps {
  element: ImageElement;
}

export default function ArticleImage(props: EditorImageProps) {
  const { element } = props;

  const editor = useSlate();
  const isSelected = useSelected();
  const isFocused = useFocused();

  const [caption, setCaption] = useState(element.caption);

  const applyCaptionChange = useCallback(
    (caption: string) => {
      const imageNodeEntry = Editor.above(editor, {
        match: (node) => Element.isElement(node) && node.type === "image",
      });

      if (!imageNodeEntry) return;

      if (caption != null) {
        setCaption(caption);
      }

      Transforms.setNodes(editor, { caption }, { at: imageNodeEntry[1] });
    },
    [editor, setCaption]
  );

  const onKeyDown: KeyboardEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      if (!isHotkey("enter", event)) return;
      applyCaptionChange((event.target as HTMLInputElement).value);
    },
    [applyCaptionChange]
  );

  const onCaptionChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => setCaption(event.target.value),
    [setCaption]
  );

  const onCaptionBlur: FocusEventHandler<HTMLInputElement> = useCallback(
    () => applyCaptionChange(caption),
    [caption, applyCaptionChange]
  );

  return (
    // Need `contentEditable={false}` or Firefox has issues with certain input types.
    <EimageContainer
      {...props.attributes}
      contentEditable={false}
      className={classNames({
        selected: isSelected && isFocused,
      })}
    >
      <ImageContainer>
        <ImageWrapper>
          <ImageButtons />
          <EImage ImageProps={{ src: element.url, alt: element.caption }} />
        </ImageWrapper>
        <ImageCaption>
          <CaptionField
            fullWidth
            type="text"
            variant="standard"
            placeholder="A caption for your image"
            defaultValue={element.caption}
            inputProps={{ onKeyDown }}
            onChange={onCaptionChange}
            onBlur={onCaptionBlur}
          />
        </ImageCaption>
      </ImageContainer>
      {props.children}
    </EimageContainer>
  );
}

function ImageButtons() {
  const editor = useSlate();

  const onDeleteImage: MouseEventHandler<HTMLButtonElement> = (event) => {
    // event.preventDefault();

    Transforms.removeNodes(editor, {
      match: (node) => Element.isElement(node) && node.type === "image",
    });
  };

  return (
    <ButtonsWrapper>
      <ButtonWrapper>
        <DeleteButton onClick={onDeleteImage}>
          <DeleteOutline />
        </DeleteButton>
      </ButtonWrapper>
    </ButtonsWrapper>
  );
}
