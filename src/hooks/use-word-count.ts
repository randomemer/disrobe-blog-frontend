import { calcWordCount, getContentString } from "@/utils";
import _ from "lodash";
import { useMemo } from "react";
import { useSlate } from "slate-react";

export default function useWordCount() {
  const editor = useSlate();

  const info = useMemo(() => {
    const content = getContentString(editor.children);
    return calcWordCount(content);
  }, [editor.children]);

  return info;
}
