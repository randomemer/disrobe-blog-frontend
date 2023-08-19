import { EditorContext } from "@/contexts/editor";
import { useContext } from "react";

export default function useEditorContext() {
  const { data, setData } = useContext(EditorContext);

  return [data, setData] as const;
}
