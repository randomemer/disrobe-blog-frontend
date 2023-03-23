import { EditorContext } from "@/contexts/editor";
import { useContext } from "react";

import type { EditorContextData } from "@/contexts/editor";
import type { Updater } from "use-immer";

export default function useEditorContext(): [
  EditorContextData,
  Updater<EditorContextData>
] {
  const { data, setData } = useContext(EditorContext);

  return [data, setData];
}
