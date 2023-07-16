import AppLayout from "@/components/layout/app";
import StoryEditor from "@/components/story-editor";
import useEditorContext from "@/hooks/use-editor-data";
import { AsyncStatus } from "@/types";
import { StoryJoinedJSON } from "@/types/backend";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function StoryEditRoute() {
  const [, setEditorData] = useEditorContext();
  const router = useRouter();
  const [status, setStatus] = useState(AsyncStatus.PENDING);

  const fetchArticle = async () => {
    setStatus(AsyncStatus.PENDING);
    try {
      const id = router.query.id as string;
      const resp = await axios.get<StoryJoinedJSON>(`/api/story/${id}`);

      const story = resp.data;
      const draft = story.draft;

      setEditorData((data) => {
        data.title = draft.title;
        data.content = draft.content;
        data.story = story;
      });
      setStatus(AsyncStatus.FULFILLED);
    } catch (error) {
      console.error(error);
      setStatus(AsyncStatus.REJECTED);
    }
  };

  useEffect(() => {
    if (status !== AsyncStatus.PENDING) {
      fetchArticle();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppLayout>
      <StoryEditor edit={true} />
    </AppLayout>
  );
}
