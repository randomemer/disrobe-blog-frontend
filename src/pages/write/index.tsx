import withAuth from "@/components/auth/hoc";
import DefaultHeadContent from "@/components/head";
import AppLayout from "@/components/layout/app";
import StoryEditor, { StoryEditorSkeleton } from "@/components/story-editor";
import Head from "next/head";

function WriteRoute() {
  return (
    <AppLayout>
      <DefaultHeadContent />

      <StoryEditor />
    </AppLayout>
  );
}

export function WriteRouteSkeleton() {
  return (
    <AppLayout>
      <Head>
        <title>Write | Disrobe</title>
      </Head>

      <StoryEditorSkeleton />
    </AppLayout>
  );
}

export default withAuth({
  beforeAuth: WriteRouteSkeleton,
  whenAuthed: WriteRoute,
});
