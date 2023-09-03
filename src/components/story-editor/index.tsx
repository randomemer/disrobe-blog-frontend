import StoryEditable from "@/components/slate/editable";
import ArticleToolbar from "@/components/slate/toolbar";
import ToolbarSkeleton from "@/components/slate/toolbar/skeleton";
import { useAutoSave } from "@/hooks/use-auto-save";
import useEditorContext from "@/hooks/use-editor-data";
import { theme } from "@/modules/mui-config";
import withInlines from "@/modules/slate/inlines";
import withVoids from "@/modules/slate/voids";
import { withPlugins } from "@/modules/utils/editor-utils";
import { Skeleton, Typography, useMediaQuery } from "@mui/material";
import { typographyClasses } from "@mui/material/Typography";
import {
  ChangeEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createEditor, Descendant } from "slate";
import { withHistory } from "slate-history";
import { Slate, withReact } from "slate-react";
import { ContentRoot, ContentWrapper, StoryTitle, ToolbarFab } from "./styles";

import type { RouteProps } from "@/types";
import { MenuOpenSharp } from "@mui/icons-material";
import classNames from "classnames";

export interface StoryEditorProps extends RouteProps {
  edit?: boolean;
}

export default function StoryEditor(props: StoryEditorProps) {
  const [editorData, setEditorData] = useEditorContext();

  const { title, content } = editorData;
  const titleRef = useRef<HTMLInputElement>(null);

  const [isToolbarOpen, setToolbarOpen] = useState(false);
  const [isTitleFocused, setTitleFocused] = useState(false);

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
      <ContentRoot>
        <ContentWrapper>
          <StoryTitle
            fullWidth
            variant="standard"
            placeholder="Title"
            className={classNames({ focused: isTitleFocused })}
            value={title}
            onChange={onTitleChange}
            onFocus={() => setTitleFocused(true)}
            onBlur={() => setTitleFocused(false)}
            InputProps={{
              inputRef: titleRef,
              disableUnderline: true,
              sx: { typography: "h1", fontWeight: 700 },
            }}
          />
          <StoryEditable />
        </ContentWrapper>
      </ContentRoot>
      <ArticleToolbar
        DrawerProps={{
          open: isToolbarOpen,
          onClose: () => setToolbarOpen(false),
        }}
      />
      <ToolbarFab
        color="primary"
        size="medium"
        onClick={() => setToolbarOpen(true)}
      >
        <MenuOpenSharp />
      </ToolbarFab>
    </Slate>
  );
}

export function StoryEditorSkeleton() {
  useEffect(() => {
    document.body.classList.add("editor");

    return () => {
      document.body.classList.remove("editor");
    };
  }, []);

  return (
    <>
      <ContentRoot>
        <ContentWrapper>
          <Typography variant="h2" marginBottom="2.4rem">
            <Skeleton variant="text" />
          </Typography>

          <Skeleton
            variant="rectangular"
            height="30rem"
            sx={{ marginBottom: "4.8rem" }}
          />

          {Array(4)
            .fill(null)
            .map((val, i) => (
              <Skeleton key={i} variant="text" sx={{ lineHeight: 1.6 }} />
            ))}
        </ContentWrapper>
      </ContentRoot>
      <ToolbarSkeleton />
    </>
  );
}
