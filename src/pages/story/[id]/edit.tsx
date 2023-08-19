import withAuth from "@/components/auth/hoc";
import AppLayout from "@/components/layout/app";
import StoryEditor from "@/components/story-editor";
import useEditorContext from "@/hooks/use-editor-data";
import { WriteRouteSkeleton } from "@/pages/write";
import { AsyncStatus } from "@/types";
import { StoryJoinedJSON } from "@/types/backend";
import axios from "axios";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function StoryEditRoute() {
  const [editorData, setEditorData] = useEditorContext();
  const router = useRouter();
  const [status, setStatus] = useState(AsyncStatus.PENDING);

  const fetchStory = async () => {
    setStatus(AsyncStatus.PENDING);
    try {
      const id = router.query.id as string;
      const token = await getAuth().currentUser!.getIdToken();
      const resp = await axios.get<StoryJoinedJSON>(`/api/story/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

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
    fetchStory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  switch (status) {
    case AsyncStatus.PENDING: {
      return <WriteRouteSkeleton />;
    }

    case AsyncStatus.FULFILLED: {
      if (editorData.story?.author_id !== getAuth().currentUser!.uid) {
        router.push("/404");
        return <WriteRouteSkeleton />;
      }

      return (
        <AppLayout>
          <StoryEditor edit={true} />
        </AppLayout>
      );
    }

    default:
      return <>Some error must have occurred</>;
  }
}

export default withAuth({
  beforeAuth: WriteRouteSkeleton,
  whenAuthed: StoryEditRoute,
});
