import AuthorModel from "@/modules/backend/client/models/author";
import StoryModel from "@/modules/backend/client/models/story";
import StoryRepository from "@/modules/backend/client/repos/story";
import { Timestamp } from "firebase/firestore";
import produce from "immer";
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
      let story: StoryModel;
      const title = titleRef.current?.value;
      const content = editorRef.current?.children;

      if (!title || !content) {
        console.log(
          "One of 'title' or 'content' is undefined. Aborting auto save"
        );
        return;
      }

      if (!data.story) {
        const author = new AuthorModel(auth.author!.id, auth.author!);
        story = await new StoryRepository().createNewDraft(
          { title, content },
          author
        );

        router.push(`/story/${story.id}/edit`, undefined, { shallow: true });
      } else {
        const updatedStory = produce(data.story, (draft) => {
          draft.data.draft.title = title;
          draft.data.draft.content = content;
          draft.data.draft.timestamp = Timestamp.now();
        });
        story = new StoryModel(updatedStory);
        await new StoryRepository().update(story);
      }

      setData((data) => {
        data.status = "fulfilled";
        data.story = story.toJSON();
      });
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
