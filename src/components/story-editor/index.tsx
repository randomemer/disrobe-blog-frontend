import StoryEditable from "@/components/slate/editable";
import ArticleToolbar from "@/components/slate/toolbar";
import useEditorContext from "@/hooks/use-editor-data";
import withInlines from "@/modules/slate/inlines";
import withVoids from "@/modules/slate/voids";
import { withPlugins } from "@/modules/utils/editor-utils";
import {
  ChangeEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { createEditor, Descendant } from "slate";
import { withHistory } from "slate-history";
import { Slate, withReact } from "slate-react";
import { ContentWrapper, StoryTitle } from "./styles";

import type { RouteProps } from "@/types";
import { useAutoSave } from "@/hooks/use-auto-save";

export interface StoryEditorProps extends RouteProps {
  edit?: boolean;
}

export default function StoryEditor(props: StoryEditorProps) {
  const [editorData, setEditorData] = useEditorContext();

  const { title, content } = editorData;
  const titleRef = useRef<HTMLInputElement>(null);

  const editor = useMemo(
    () =>
      withPlugins(createEditor(), [
        withHistory,
        withReact,
        withInlines,
        withVoids,
      ]),
    []
  );

  editor.children = content;
  const editorRef = useRef(editor);
  const onContentChange = useAutoSave({ titleRef, editorRef });

  useEffect(() => {
    document.body.classList.add("editor");

    return () => {
      document.body.classList.remove("editor");
    };
  }, []);

  const onEditorChange = useCallback(
    (value: Descendant[]) => {
      setEditorData((data) => {
        data.content = value;
      });

      const isAstChange = editor.operations.some(
        (op) => op.type !== "set_selection"
      );

      if (isAstChange) onContentChange();
    },
    [editor, setEditorData, onContentChange]
  );

  const onTitleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setEditorData((data) => {
      data.title = event.target.value;
    });
    onContentChange();
  };

  return (
    <Slate editor={editor} initialValue={content} onChange={onEditorChange}>
      <ContentWrapper>
        <StoryTitle
          variant="standard"
          placeholder="Title"
          value={title}
          onChange={onTitleChange}
          InputProps={{ disableUnderline: true, inputRef: titleRef }}
        />
        <StoryEditable />
      </ContentWrapper>
      <ArticleToolbar />
    </Slate>
  );
}
