import { readTimeHumanizer } from "@/utils";
import { useMemo } from "react";
import { Node } from "slate";
import { useSlate } from "slate-react";

export default function useWordCount() {
  const editor = useSlate();

  const info = useMemo(() => {
    const WORD_REGEX = /\b\w+\b/gm;
    const content = editor.children.map((node) => Node.string(node)).join("\n");

    let wordCount = 0;
    let match;
    while ((match = WORD_REGEX.exec(content)) !== null) {
      if (match.index === WORD_REGEX.lastIndex) {
        WORD_REGEX.lastIndex++;
      }
      wordCount += match.length;
    }

    return {
      wordCount,
      readTime: readTimeHumanizer(wordCount * 300),
    };
  }, [editor.children]);

  return info;
}
