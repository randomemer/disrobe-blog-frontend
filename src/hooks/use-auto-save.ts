import { StoryJoinedJSON, StorySnapshotJSON } from "@/types/backend";
import { useRouter } from "next/router";
import { RefObject, useCallback, useRef } from "react";
import { Editor } from "slate";
import useEditorContext from "./use-editor-data";
import useAuth from "./use-user";

const DELAY = 5000;

export interface AutoSaveHookProps {
  titleRef: RefObject<HTMLInputElement>;
  editorRef: RefObject<Editor>;
}

export function useAutoSave(props: AutoSaveHookProps) {
  const { titleRef, editorRef } = props;
  const [data, setData] = useEditorContext();
  const [auth] = useAuth();
  const router = useRouter();

  const timer = useRef<NodeJS.Timeout | null>(null);
  const saved = useRef<number | null>(null);

  const uploadDraft = useCallback(async () => {
    setData((data) => {
      data.status = "pending";
    });
    try {
      const title = titleRef.current?.value;
      const content = editorRef.current?.children;

      if (!title || !content) {
        console.log(
          "One of 'title' or 'content' is undefined. Aborting auto save"
        );
        return;
      }

      if (!data.story) {
        const storyData = {
          author_id: auth.author!.id,
          draft: { title, content },
        };
        const resp = await fetch(`/api/story`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(storyData),
        });
        const story: StoryJoinedJSON = await resp.json();

        setData((draft) => {
          draft.status = "fulfilled";
          draft.story = story;
        });
        router.push(`/story/${story.id}/edit`, undefined, { shallow: true });
      } else {
        const draftData = { title, content };
        const resp = await fetch(
          `/api/story/${data.story.id}/snapshot/${data.story.draft_snap_id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(draftData),
          }
        );
        const updatedDraft: StorySnapshotJSON = await resp.json();

        setData((draft) => {
          draft.status = "fulfilled";
          draft.story!.draft = updatedDraft;
        });
      }
    } catch (error) {
      console.error(error);
      setData((data) => {
        data.status = "rejected";
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setData, data.story, auth.author, router]);

  const onContentChange = useCallback(() => {
    const now = Date.now();

    // schedule a save
    if (!saved.current || now - saved.current > 0) {
      saved.current = now + DELAY;
      timer.current = setTimeout(uploadDraft, DELAY);
    }
  }, [uploadDraft]);

  return onContentChange;
}
