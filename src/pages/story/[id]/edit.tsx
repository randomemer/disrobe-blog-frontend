import AppLayout from "@/components/layout/app";
import StoryEditor from "@/components/story-editor";
import useEditorContext from "@/hooks/use-editor-data";
import AdminStoryRepo from "@/modules/backend/admin/repos/story";
import withProtectedRoute from "@/modules/backend/with-protected-route";
import { RouteProps } from "@/types";
import { AuthorJSON, StoryJSON } from "@/types/backend";
import { useEffect } from "react";

export const getServerSideProps = withProtectedRoute<StoryEditRouteProps>(
  async (context) => {
    const author = context.req.user.author;

    const storyId = context.query.id as string;
    const story = await new AdminStoryRepo().fetchId(storyId);

    if (!story || story.author.id !== author.id) {
      return { notFound: true };
    }

    return { props: { author, story: story.toJSON() } };
  }
);

export interface StoryEditRouteProps extends RouteProps {
  author: AuthorJSON;
  story: StoryJSON;
}

export default function StoryEdit(props: StoryEditRouteProps) {
  const [, setEditorData] = useEditorContext();

  const draft = props.story.data.draft;

  useEffect(() => {
    setEditorData((data) => {
      data.title = draft.title;
      data.content = draft.content;
      data.story = props.story;
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppLayout>
      <StoryEditor edit={true} />
    </AppLayout>
  );
}
