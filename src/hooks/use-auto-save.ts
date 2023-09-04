import { api } from "@/modules/utils";
import { AsyncStatus } from "@/types";
import { StoryJoinedJSON, StorySnapshotJSON } from "@/types/backend";
import { getAuth } from "firebase/auth";
import { useSnackbar } from "material-ui-snackbar-provider";
import { useRouter } from "next/router";
import { RefObject, useCallback, useRef } from "react";
import { Editor } from "slate";
import useAuth from "./use-auth";
import useEditorContext from "./use-editor-data";

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
  const snackbar = useSnackbar();

  const timer = useRef<NodeJS.Timeout | null>(null);
  const saved = useRef<number | null>(null);

  const uploadDraft = useCallback(async () => {
    setData((data) => {
      data.status = AsyncStatus.PENDING;
    });
    try {
      const title = titleRef.current?.value;
      const content = editorRef.current?.children;
      const token = await getAuth().currentUser!.getIdToken();

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

        const resp = await api.post<StoryJoinedJSON>("/v1/story/", storyData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const story = resp.data;

        setData((draft) => {
          draft.status = AsyncStatus.FULFILLED;
          draft.story = story;
        });
        router.replace(`/story/${story.id}/edit`, undefined, { shallow: true });
      } else {
        const draftData = { draft: { title, content } };
        const resp = await api.patch<StorySnapshotJSON>(
          `/v1/story/${data.story.id}/`,
          draftData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const updatedDraft = resp.data;

        setData((draft) => {
          draft.status = AsyncStatus.FULFILLED;
          draft.story!.draft = updatedDraft;
        });
      }
    } catch (error) {
      setData((data) => {
        data.status = AsyncStatus.REJECTED;
      });
      snackbar.showMessage((error as Error).message, "OK", () => {}, {
        severity: "error",
      } as any);
      console.error(error);
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
