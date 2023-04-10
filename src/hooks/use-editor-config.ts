import { useCallback } from "react";
import { EditorEvents } from "@/utils/editor-utils";
import { useSlate } from "slate-react";

import type { KeyboardEventHandler } from "react";

export default function useEditorConfig() {
  const editor = useSlate();

  const onKeyDown = useCallback<KeyboardEventHandler>(
    (event) => EditorEvents.onKeyDown(editor, event),
    [editor]
  );

  return { onKeyDown };
}
