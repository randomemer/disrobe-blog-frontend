import AppLayout from "@/components/layout/app";
import StoryEditor from "@/components/story-editor";
import useEditorContext from "@/hooks/use-editor-data";
import { StoryModel } from "@/modules/backend";
import withProtectedRoute from "@/modules/backend/with-protected-route";
import { jsonify } from "@/modules/utils";
import { RouteProps } from "@/types";
import { AuthorJSON, StoryJoinedJSON } from "@/types/backend";
import { useEffect } from "react";

export const getServerSideProps = withProtectedRoute<StoryEditRouteProps>(
  async (context) => {
    const author = context.req.user.author;
    const storyId = context.query.id as string;

    const result = await StoryModel.query()
      .withGraphJoined({
        author: true,
        draft: true,
      })
      .findById(storyId);

    const transformed = jsonify(result?.toJSON()) as
      | StoryJoinedJSON
      | undefined;

    if (!transformed || transformed.author.id !== author.id) {
      return { notFound: true };
    }

    return { props: { author: transformed.author, story: transformed } };
  }
);

export interface StoryEditRouteProps extends RouteProps {
  author: AuthorJSON;
  story: StoryJoinedJSON;
}

export default function StoryEdit(props: StoryEditRouteProps) {
  const [, setEditorData] = useEditorContext();

  const draft = props.story.draft;

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
