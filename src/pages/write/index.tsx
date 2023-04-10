import AppLayout from "@/components/layout/app";
import StoryEditor from "@/components/story-editor";
import withProtectedRoute from "@/modules/backend/with-protected-route";
import { RouteProps, User } from "@/types";
import { AuthorJSON } from "@/types/backend";
import Head from "next/head";

export const getServerSideProps = withProtectedRoute<WriteRouteProps>(
  async (context) => {
    const auth = context.req.user;

    return { props: { author: auth.author } };
  }
);

export interface WriteRouteProps extends RouteProps {
  author: AuthorJSON;
}

export default function WriteRoute(props: WriteRouteProps) {
  return (
    <AppLayout>
      <Head>
        <title>Write | Disrobe</title>
      </Head>

      <StoryEditor />
    </AppLayout>
  );
}
