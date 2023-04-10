import classNames from "classnames";
import { DragEventHandler, useState } from "react";
import { DragArea, DragOverlay, UploadButton } from "./styles";

import type { ReactElement, ComponentPropsWithoutRef, RefObject } from "react";

export interface FileDragAreaProps {
  icon: ReactElement;
  onDrop: Function;
  inputProps?: ComponentPropsWithoutRef<"input">;
  inputRef: RefObject<HTMLInputElement>;
}

export default function FileDragArea(props: FileDragAreaProps) {
  const { icon, inputRef } = props;
  const [isDragging, setDragging] = useState(false);

  const onDrag: DragEventHandler<HTMLDivElement> = (event) => {
    event.stopPropagation();
    event.preventDefault();

    if (event.type === "dragenter" || event.type === "dragover") {
      setDragging(true);
    } else if (event.type === "dragleave") {
      setDragging(false);
    }
  };

  const onDrop: DragEventHandler<HTMLDivElement> = (event) => {
    event.stopPropagation();
    event.preventDefault();

    setDragging(false);
    props.onDrop(event.dataTransfer.files);
  };

  return (
    <DragArea onDragEnter={onDrag}>
      <input type="file" hidden={true} {...props.inputProps} ref={inputRef} />

      <label
        htmlFor={props.inputProps?.id}
        className={classNames({
          dragging: isDragging,
        })}
      >
        {icon}
        <p>Drag and drop or </p>
        <div>
          <UploadButton onClick={() => inputRef.current?.click()}>
            Upload
          </UploadButton>
          <span> a file</span>
        </div>
      </label>

      {isDragging && (
        <DragOverlay
          onDragEnter={onDrag}
          onDragOver={onDrag}
          onDragLeave={onDrag}
          onDrop={onDrop}
        ></DragOverlay>
      )}
    </DragArea>
  );
}
